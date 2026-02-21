// scripts/update-roster.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// NPB公式：中日 支配下ロスター（年度表示はページ側で最新に切り替わる） :contentReference[oaicite:3]{index=3}
const URL_ROSTER = "https://npb.jp/bis/teams/rst_d.html";
// NPB公式：中日 育成選手登録（2026） :contentReference[oaicite:4]{index=4}
const URL_DEV_2026 = "https://npb.jp/announcement/2026/registereddev_d.html";

function calcAge(birthYYYYMMDD) {
  if (!birthYYYYMMDD) return null;
  // 例: "2003.12.18" -> Date
  const m = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(birthYYYYMMDD);
  if (!m) return null;
  const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
  const today = new Date();
  let age = today.getFullYear() - y;
  const beforeBirthday =
    today.getMonth() + 1 < mo || (today.getMonth() + 1 === mo && today.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
}

function normalizePosCategory(sectionLabel) {
  // NPBの区分：投手/捕手/内野手/外野手
  if (sectionLabel.includes("投手")) return "pitcher";
  if (sectionLabel.includes("捕手")) return "catcher";
  if (sectionLabel.includes("内野手")) return "infielder";
  if (sectionLabel.includes("外野手")) return "outfielder";
  return "unknown";
}

async function fetchHtml(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${res.status} ${url}`);
  return await res.text();
}

function parseNpbRoster(html) {
  const $ = cheerio.load(html);

  // ページ内に「投手/捕手/内野手/外野手」のテーブルが並ぶ構造
  // 見出しテキストを辿って、直後のtableを読む方式にしておく
  const results = [];

  // 監督は別テーブルのことが多いので、まず監督も拾う（あれば）
  // テーブルの列が違う可能性があるため、ここは保守的に。
  $("table").each((_, table) => {
    const headers = $(table).find("tr").first().text().replace(/\s+/g, " ").trim();
    const hasPitcherHeaders = headers.includes("投手") || headers.includes("投") || headers.includes("打");
    const hasNumber = headers.includes("No") || headers.includes("番号");

    // 支配下選手のテーブルっぽいものだけ対象にする
    if (!hasNumber) return;

    $(table)
      .find("tr")
      .slice(1)
      .each((__, tr) => {
        const tds = $(tr).find("td");
        if (tds.length < 2) return;

        // 典型カラム: No / 氏名 / 生年月日 / 身長 / 体重 / 投 / 打 / 備考
        const no = $(tds[0]).text().trim();
        const name = $(tds[1]).text().trim();

        // 空行除外
        if (!no || !name) return;

        const birth = tds[2] ? $(tds[2]).text().trim() : null;
        const height = tds[3] ? $(tds[3]).text().trim() : null;
        const weight = tds[4] ? $(tds[4]).text().trim() : null;
        const throws = tds[5] ? $(tds[5]).text().trim() : null;
        const bats = tds[6] ? $(tds[6]).text().trim() : null;

        // section推定：直前の見出しを探す（tableの直前にあるh3/h4等）
        const sectionText =
          $(table).prevAll("h2,h3,h4").first().text().trim() || "";

        const positionCategory = normalizePosCategory(sectionText);

        results.push({
          number: Number(no),
          name,
          category: "player",
          position: positionCategory === "pitcher" ? "投手"
                  : positionCategory === "catcher" ? "捕手"
                  : positionCategory === "infielder" ? "内野手"
                  : positionCategory === "outfielder" ? "外野手"
                  : "不明",
          positionCategory,
          birthdate: birth,
          age: calcAge(birth),
          height: height ? Number(height) : null,
          weight: weight ? Number(weight) : null,
          throws: throws || null,
          bats: bats || null,
          dev: false,
          source: "npb_roster",
        });
      });
  });

  // 重複排除（同番号が複数テーブルに出る場合がある）
  const uniq = new Map();
  for (const p of results) uniq.set(String(p.number), p);
  return [...uniq.values()].sort((a, b) => a.number - b.number);
}

function parseNpbDev(html) {
  const $ = cheerio.load(html);

  const out = [];
  // 形式：公示日/位置/番号/選手名 の表 :contentReference[oaicite:5]{index=5}
  $("table tr")
    .slice(1)
    .each((_, tr) => {
      const tds = $(tr).find("td");
      if (tds.length < 4) return;
      const pos = $(tds[1]).text().trim();   // 投手/捕手/内野手/外野手
      const no = $(tds[2]).text().trim();
      const name = $(tds[3]).text().trim();
      if (!no || !name) return;

      const positionCategory = normalizePosCategory(pos);

      out.push({
        number: Number(no),
        name,
        category: "player",
        position: pos,
        positionCategory,
        birthdate: null,
        age: null,
        height: null,
        weight: null,
        throws: null,
        bats: null,
        dev: true,
        source: "npb_dev_2026",
      });
    });

  return out.sort((a, b) => a.number - b.number);
}

function mergeRoster(main, dev) {
  const byNo = new Map();
  for (const p of main) byNo.set(String(p.number), p);
  for (const p of dev) {
    const k = String(p.number);
    if (!byNo.has(k)) byNo.set(k, p);
    else {
      // 同番号が存在した場合：devフラグだけ付加（通常は起きにくい）
      byNo.set(k, { ...byNo.get(k), dev: byNo.get(k).dev || p.dev });
    }
  }
  return [...byNo.values()].sort((a, b) => a.number - b.number);
}

function toTs(players) {
  // アプリ側がそのまま使える TS を生成
  return `// AUTO-GENERATED. DO NOT EDIT.
// Generated by scripts/update-roster.mjs
export const playersData = ${JSON.stringify(players, null, 2)} as const;

export type Player = (typeof playersData)[number];
`;
}

async function main() {
  const rosterHtml = await fetchHtml(URL_ROSTER);
  const devHtml = await fetchHtml(URL_DEV_2026);

  const mainPlayers = parseNpbRoster(rosterHtml);
  const devPlayers = parseNpbDev(devHtml);

  const merged = mergeRoster(mainPlayers, devPlayers);

  const outPath = path.join(ROOT, "client", "src", "lib", "playersData.generated.ts");
  fs.writeFileSync(outPath, toTs(merged), "utf-8");

  console.log(`Generated: ${outPath}`);
  console.log(`Players: ${merged.length} (main=${mainPlayers.length}, dev=${devPlayers.length})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
