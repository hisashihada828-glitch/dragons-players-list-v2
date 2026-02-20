import { Player } from "@/lib/playersData";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const getPositionBadgeColor = (category: string) => {
    switch (category) {
      case "pitcher":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "infielder":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "outfielder":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100";
      case "catcher":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "player":
        return "選手";
      case "coach":
        return "コーチ";
      case "staff":
        return "スタッフ";
      default:
        return "不明";
    }
  };

  const getPositionLabel = (pos: string) => {
    switch (pos) {
      case "pitcher":
        return "投手";
      case "infielder":
        return "内野手";
      case "outfielder":
        return "外野手";
      case "catcher":
        return "捕手";
      default:
        return pos || "不明";
    }
  };

  // “一覧カードに残す”最小情報
  const number = String((player as any).number ?? "");
  const name = (player as any).name ?? "";
  const category = (player as any).category ?? ""; // player/coach/staff の想定
  const position = (player as any).position ?? ""; // pitcher/infielder/outfielder/catcher の想定

  // 詳細側（存在しない項目でも落ちないように）
  const age = (player as any).age;
  const draft = (player as any).draft;
  const bats = (player as any).bats;
  const throws = (player as any).throws;

  return (
    <div className="rounded-xl border bg-white/70 p-3 shadow-sm dark:bg-zinc-900/40">
      <div className="flex items-start justify-between gap-3">
        {/* 左：最小表示 */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            {number ? (
              <span className="text-lg font-semibold tabular-nums">{number}</span>
            ) : null}
            <h3 className="truncate text-base font-semibold">{name}</h3>
          </div>

          <div className="mt-1 flex flex-wrap gap-2">
            {category ? (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {getCategoryLabel(category)}
              </span>
            ) : null}

            {position ? (
              <span
                className={[
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  getPositionBadgeColor(position),
                ].join(" ")}
              >
                {getPositionLabel(position)}
              </span>
            ) : null}
          </div>
        </div>

        {/* 右：詳細ボタン → 下からSheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline">
              詳細
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" className="max-h-[85vh] overflow-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {number ? <span className="tabular-nums">{number}</span> : null}
                <span>{name}</span>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-4 space-y-3 text-sm">
              <Row label="カテゴリ" value={category ? getCategoryLabel(category) : "-"} />
              <Row label="ポジション" value={position ? getPositionLabel(position) : "-"} />
              <Row label="年齢" value={age != null ? `${age}歳` : "-"} />
              <Row label="ドラフト" value={draft ?? "-"} />
              <Row
                label="投打"
                value={[throws, bats].filter(Boolean).join(" / ") || "-"}
              />

              {/* ここに、今までカードに出していた詳細項目を追加していく */}
              {/* 例）
              <Row label="出身" value={(player as any).from ?? "-"} />
              <Row label="身長体重" value={(player as any).body ?? "-"} />
              */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value ?? "-"}</span>
    </div>
  );
}
