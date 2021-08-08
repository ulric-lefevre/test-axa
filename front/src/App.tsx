import { useEffect, useState } from "react";

import Chart from "./components/Chart/Chart";
import Table from "./components/Table/Table";
import Loading from "./components/Loading/Loading";
import Error from "./components/Error/Error";

import { Stock } from "./types/Stock";
import { Column } from "./types/Column";

import "./App.scss";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<Stock[]>([]);
  const [count, setCount] = useState(20);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch("/stocks")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [setData]);

  const handleChangeRange = (value: string) => {
    setCount(parseInt(value));
  };

  const handleChangeData = (index: number, value: string) => {
    console.log("handleChangeData => index:", index, " value:", value);
    const newData = [...data];
    const i = newData.findIndex((d) => d.index === index);
    newData[i].stocks = value;
    setData(newData);
  };

  const d = data.slice(0, count);
  const columns: Column[] = [
    { name: "Date", data: "date" },
    { name: "Stock", data: "stocks" },
  ];

  return (
    <div className="App">
      <header className="App-header">
        {hasError ? (
          <Error />
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <Chart data={d} />
            <div className="form">
              Number of results to display:
              <input
                value={count}
                onChange={(e) => handleChangeRange(e.target.value)}
                type="number"
              />
            </div>
            <Table columns={columns} data={d} onChange={handleChangeData} />
          </>
        )}
      </header>
    </div>
  );
};

export default App;
