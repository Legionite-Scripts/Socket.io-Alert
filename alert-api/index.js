import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
const port = 3002;
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3001" } });

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));

app.get("/", (req, res) => {
  res.status(200).json({ Message: " Active" });
});

let db = [];
app.post("/purchase", (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("All filed required!");
    const product = db.push(email);
    console.log(db);
    io.emit("purchase", { data: "Purchase successful"});
    return res.status(200).json({ message: "Item succesfully purchased" });
  } catch (err) {
    throw new Error(err);
  }
});

server.listen(port, () => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id} `);

    socket.on("disconnect", () => {
      console.log(`User disconnected: $ ${socket.id}  `);
    });
  });
  console.log("Seever is running on port", +port);
});
