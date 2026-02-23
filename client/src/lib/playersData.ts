export { TEAMS } from "./teams";
export type { TeamId } from "./teams";
export type { Player } from "./playerTypes";

import { dragonsPlayers } from "./players/dragons";
import { baystarsPlayers } from "./players/baystars";
import { tigersPlayers } from "./players/tigers";

import { giantsPlayers } from "./players/giants";
import { carpPlayers } from "./players/carp";
import { swallowsPlayers } from "./players/swallows";
import { hawksPlayers } from "./players/hawks";
import { marinesPlayers } from "./players/marines";
import { fightersPlayers } from "./players/fighters";
import { eaglesPlayers } from "./players/eagles";
import { buffaloesPlayers } from "./players/buffaloes";
import { lionsPlayers } from "./players/lions";

export const playersData: Player[] = [
  ...dragonsPlayers,
  ...baystarsPlayers,
  ...tigersPlayers,

  ...giantsPlayers,
  ...carpPlayers,
  ...swallowsPlayers,

  ...hawksPlayers,
  ...marinesPlayers,
  ...fightersPlayers,
  ...eaglesPlayers,
  ...buffaloesPlayers,
  ...lionsPlayers,
];