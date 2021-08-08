import { db } from "./db";
import * as jsonServer from "json-server";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(db);
const port = 3000;
const delay = 1000;

server.use((req, res, next) => {
  setTimeout(next, delay);
});
server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
