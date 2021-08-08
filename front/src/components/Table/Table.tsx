import { Stock } from "../../types/Stock";
import { Column } from "../../types/Column";

import "./Table.scss";

type Props = {
  columns: Column[];
  data: Stock[];
  onChange: (index: number, value: string) => void;
};

const Table = ({ columns, data, onChange }: Props) => {
  const stocks = data
    .map((d) => {
      const date = new Date(d.timestamp);
      return {
        date: `${date.toLocaleString("en-US", {
          month: "long",
        })} ${date.getDate()}`,
        stocks: d.stocks,
        index: d.index,
      };
    })
    .reverse();

  return (
    <div className="scroll-table">
      <table>
        {columns.map((column, colIndex) => {
          return (
            <tr key={`tr-${colIndex}`} id={`tr-${colIndex}`}>
              <th>{column.name}</th>
              {stocks.map((stock, index) => {
                return (
                  <td
                    key={`td-${colIndex}-${index}`}
                    id={`td-${colIndex}-${index}`}
                  >
                    {column.name === "Date" ? (
                      stock.date
                    ) : (
                      <input
                        value={stock.stocks}
                        onChange={(e) => onChange(stock.index, e.target.value)}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
