import e from "express";
import * as artistsDao from "./artists.dao.js";
import * as songsDao from "./songs.dao.js";

export function welcome(req, res) {
  res.send("<a href='http://localhost:3000/artists'>Acceder a Spotify:</a>");
}

export function getAllArtists(req, res) {
  // res.json(artists);
  res.json(artistsDao.getAll());
}

export function getArtistByID(req, res) {
  const idArtist = Number(req.params.idArtist);

  // // const found = artists.find((e) => e.id === idArtist);
  const found = artistsDao.findArtistById(idArtist);

  // if (!found) {
  //   return res.status(404).json({ error: "Artista no encontrado" });
  // }

  // const songsCount = songs.filter(song => song.idArtist === idArtist).length;

  // found.songsCount = dao.countSongsByArtistId(idArtist);

  res.status(200).json(found);
}

export function createArtist(req, res) {
  const newArtist = req.body;
  // const Maxid = artists.map((element) => element.id);
  // const max = Math.max(...Maxid);
  // newArtist.id = max + 1;

  // validaciones!!
  if (!newArtist.name || newArtist.name.trim() === "") {
    return res.status(400).json({ error: "Nombre requerido" });
  }

  newArtist.id = artistsDao.createArtist(newArtist);

  // artists.push(newArtist);
  res.status(201).json(newArtist);
}

export function updateArtist(req, res) {
  const newData = req.body;
  const id = req.params.idArtist;

  // // validaciones
  // // datos de entrada
  // if (!newData.name || newData.name.trim() === "") {
  //   return res.status(400).json({ error: "Nombre requerido" });
  // }

  if (!artistsDao.updateArtist(id, newData)) {
    return res.status(404).json({ error: "artista no encontrado" });
  }

  return res.status(200).json(newData);
}

export async function deleteArtist(req, res) {
  const idArtist = req.params.idArtist;

  // // si existe
  // const found = artistsDao.findArtistById(idArtist);
  // if (!found) return res.status(404).json({ wtf: "Artista no encontrado" });

  artistsDao.deleteArtist(idArtist);
  res.status(200).json({ deleted: true });
}

export function getSongsFromArtist(req, res) {
  const idArtist = Number(req.params.idArtist);

  // const found = artistsDao.findArtistById(idArtist);

  // if (!found) {
  //   return res.status(404).json({ error: "Artista no encontrado" });
  // }

  // found.songs = songsDao.findArtistSongsListById(idArtist);
  const songs = songsDao.findArtistSongsListById(idArtist);

  // res.status(200).json(found);
  res.status(200).json(songs);
}

export function getSpecificSongFromArtist(req, res) {
  const idArtist = Number(req.params.idArtist);
  const idSong = Number(req.params.idSong);

  // const found = artistsDao.findArtistById(idArtist);

  // if (!found) {
  //   return res.status(404).json({ error: "Artista no encontrado" });
  // }

  const song = songsDao.findSongByArtist(idSong, idArtist);

  if (!song) {
    return res.status(404).json({ error: "Canción no encontrada" });
  }

  // found.song = song;
  // res.status(200).json(found);
  // const song = song;
  res.status(200).json(song);
}

export function createSongForArtist(req, res) {
  const idArtist = Number(req.params.idArtist);

  // const found = artistsDao.findArtistById(idArtist);

  // if (!found) {
  //   return res.status(404).json({ error: "Artista no encontrado" });
  // }

  if (
    !req.body.name ||
    req.body.name.trim() === "" ||
    !req.body.duration ||
    req.body.duration <= 30
  ) {
    return res.status(400).json({
      error: "Nombre y duración requeridos, duración mayor a 30 segundos",
    });
  }

  found.songs = songsDao.findArtistSongsListById(idArtist);
  const newSong = req.body;
  newSong.id = songsDao.createSongForArtist(newSong, idArtist);
  found.songs.push(newSong);
  res.status(200).json(found);
}

export function updateSong(req, res) {
  const idArtist = Number(req.params.idArtist);

  // const found = artistsDao.findArtistById(idArtist);

  // if (!found) {
  //   return res.status(404).json({ error: "Artista no encontrado" });
  // }

  if (
    !req.body.name ||
    req.body.name.trim() === "" ||
    !req.body.duration ||
    req.body.duration <= 30
  ) {
    return res.status(400).json({
      error: "Nombre y duración requeridos, duración mayor a 30 segundos",
    });
  }

  const idSong = Number(req.params.idSong);
  const song = songsDao.findSongByArtist(idSong, idArtist);

  if (!song) {
    return res.status(404).json({ error: "Canción no encontrada" });
  }

  songsDao.updateSong(idArtist, idSong, req.body);
  res.status(200).json({ updated: true });
}
export function deleteSong(req, res) {
  const idArtist = Number(req.params.idArtist);

  // const found = artistsDao.findArtistById(idArtist);

  // if (!found) {
  //   return res.status(404).json({ error: "Artista no encontrado" });
  // }

  const idSong = Number(req.params.idSong);
  const song = songsDao.findSongByArtist(idSong, idArtist);

  if (!song) {
    return res.status(404).json({ error: "Canción no encontrada" });
  }

  songsDao.deleteSong(idArtist, idSong);
  res.status(200).json({ deleted: true });
}
