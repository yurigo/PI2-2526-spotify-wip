import express from "express";
import chalk from "chalk";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from 'express-rate-limit'
import { verificarArtista } from "./middlewares.js";

import {
  welcome,
  getAllArtists,
  getArtistByID,
  createArtist,
  updateArtist,
  deleteArtist,
  getSongsFromArtist,
  getSpecificSongFromArtist,
  createSongForArtist,
  updateSong,
  deleteSong,
} from "./controller.js";


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(limiter)

// middleware
function mimideluer(req, res, next){
  res.status(500).send("ERROR!!")
}



// app.use(mimideluer);

app.get("/" , mimideluer, welcome);
app.get("/artists", getAllArtists);
app.get("/artists/:idArtist", verificarArtista, getArtistByID);
app.post("/artists", createArtist);
app.put("/artists/:idArtist", verificarArtista, updateArtist);
app.delete("/artists/:idArtist", verificarArtista, deleteArtist);

app.get("/artists/:idArtist/songs", verificarArtista, getSongsFromArtist);
app.get("/artists/:idArtist/songs/:idSong", verificarArtista, getSpecificSongFromArtist);
app.post("/artists/:idArtist/songs", createSongForArtist);
app.put("/artists/:idArtist/songs/:idSong", verificarArtista, updateSong);
app.delete("/artists/:idArtist/songs/:idSong", verificarArtista, deleteSong);

app.listen(3000, () => {
  console.log(chalk.blue("http://localhost:3000"));
});
