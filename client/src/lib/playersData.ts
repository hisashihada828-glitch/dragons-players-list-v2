export { TEAMS } from "./teams";
export type { TeamId } from "./teams";
export type { Player } from "./playerTypes";

import type { Player } from "./playerTypes";
import { dragonsPlayers } from "./players/dragons";

export const playersData: Player[] = [
  ...dragonsPlayers,
];