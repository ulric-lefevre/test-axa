import stocks from "./database/stocks";
import { Stock } from "./types/Stock";

interface DB {
  stocks: Stock[];
}

export const db: DB = { stocks: stocks() };
