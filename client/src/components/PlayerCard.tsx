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
  const getPositionBadgeColor = (position: string) => {
    switch (position) {
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

  const number = String((player as any).number ?? "");
  const name = (player as any).name ?? "";
  const category = (player as any).category ?? "";
  const position = (player as any).position ?? "";

  const age = (player as any).age;
  const draft = (player as any).draft;
  const bats = (player as any).bats;
  const throws = (player as any).throws;

  return (
    <div className="rounded-lg border bg-white/70 px-3 py-2 shadow-sm dark:bg-zinc-900/40">
      <div className="flex items-center justify-between gap-3">
        {/* 左：コンパクト1行 */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="w-10 shrink-0 text-center text-sm font-semibold tabular-nums">
            {number || "—"}
          </div>

          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{name}</div>

            <div className="mt-0.5 flex flex-wrap gap-2">
              {position ? (
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-[11px] font-medium",
                    getPositionBadgeColor(position),
                  ].join(" ")}
                >
                  {getPositionLabel(position)}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* 右：詳細ボタン */}
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{value ?? "-"}</div>
    </div>
  );
}
