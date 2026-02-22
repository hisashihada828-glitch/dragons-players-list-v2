import type { TeamId } from "./teams";

export interface Player {
  teamId: TeamId;
  number: string; // ★あなたの generated に合わせて string（重要）
  name: string;
  position: string;
  age: number;
  draft: string;
  category: "player" | "coach" | "staff";
  positionCategory?: "pitcher" | "infielder" | "outfielder" | "catcher";
}