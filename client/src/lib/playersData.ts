export { TEAMS } from "./teams";
export type { TeamId } from "./teams";
export type { Player } from "./playerTypes";

import type { Player } from "./playerTypes";
import { dragonsPlayers } from "./players/dragons";
import { baystarsPlayers } from "./players/baystars";
  
export const playersData: Player[] = [
  ...dragonsPlayers,
  ...baystarsPlayers,

];