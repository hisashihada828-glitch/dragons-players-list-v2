export { TEAMS } from "./teams";
export type { TeamId } from "./teams";
export type { Player } from "./playerTypes";

import { dragonsPlayers } from "./players/dragons";
import { baystarsPlayers } from "./players/baystars";
import { tigersPlayers } from "./players/tigers";

export const playersData: Player[] = [
  ...dragonsPlayers,
  ...baystarsPlayers,
  ...tigersPlayers,

];