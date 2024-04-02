import { ServerV1 } from "./server/server.js";
const server = new ServerV1(2000, null, null);
server.start();
