export const TEAMS = {
    // セ・リーグ
    dragons: "中日ドラゴンズ",
    tigers: "阪神タイガース",
    giants: "読売ジャイアンツ",
    carp: "広島東洋カープ",
    swallows: "東京ヤクルトスワローズ",
    baystars: "横浜DeNAベイスターズ",
    // パ・リーグ
    hawks: "福岡ソフトバンクホークス",
    fighters: "北海道日本ハムファイターズ",
    marines: "千葉ロッテマリーンズ",
    buffaloes: "オリックス・バファローズ",
    eagles: "東北楽天ゴールデンイーグルス",
    lions: "埼玉西武ライオンズ",
  } as const;
  
  export type TeamId = keyof typeof TEAMS;