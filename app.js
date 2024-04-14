const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const app = express();

const videoFileMap = {
  City: "assets/City.mp4",
  Skateboarding: "assets/Skateboarding.mp4",
  Skiing: "assets/Skiing.mp4",
};

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors("*"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/videoplayer", (req, res) => {
  const range = req.headers.range;
  const videoPath = "Skateboarding.mp4";
  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 1 * 5e7;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start, CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize * 10}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
});
app.get("/stream/:filename", (req, res) => {
  const fileName = req.params.filename;
  const range = req.headers.range;
  const filePath = videoFileMap[fileName];

  if (!filePath) res.status(404).send("file not found");
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const head = {
      "Content-Range": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

module.exports = app;
