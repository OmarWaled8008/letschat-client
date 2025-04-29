import { io } from "socket.io-client";
const socket = io("https://letschat-server-production.up.railway.app");
export default socket;
