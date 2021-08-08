import { Stock } from "../types/Stock";

export default () => {
  const stocks: Array<Stock> = [];
  // Create 1000 users
  for (let i = 0; i < 100; i++) {
    stocks.push({
      timestamp: new Date(new Date().setDate(new Date().getDate() - i)),
      index: i,
      stocks: `${(Math.random() * 10 + 15 - (i / 100) * 15).toFixed(3)}`,
    });
  }
  return stocks;
};
