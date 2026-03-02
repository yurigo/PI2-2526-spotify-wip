import Database from "better-sqlite3";
import { nanoid } from "nanoid";

const db = new Database("db.sqlite", { verbose: console.log });

export function countSongsByArtistId(id) {
  const stmt = db.prepare(
    "SELECT COUNT(*) as total FROM songs WHERE idArtist = ?",
  );
  return stmt.get(id).total;
}

export function findSongByArtist(songId, artistId) {
  const stmt = db.prepare("SELECT * FROM songs WHERE id = ? AND idArtist = ?");
  return stmt.get(songId, artistId);
}

export function findArtistSongsListById(artistId) {
  // return songs.filter((song) => song.idArtist === artistId);

  const stmt = db.prepare("SELECT * FROM songs WHERE idArtist = ?");
  return stmt.all(artistId);
}

export function createSongForArtist(songData, artistId) {
  const stmt = db.prepare(
    "INSERT INTO songs (name, duration, idArtist) VALUES (?, ?, ?)",
  );

  const { lastInsertRowid } = stmt.run(
    songData.name,
    songData.duration,
    artistId,
  ); // deconstrucción de un objeto.

  return lastInsertRowid;
}

export function updateSong(idArtist, idSong, newSongData) {
  const stmt = db.prepare(
    "UPDATE songs SET name = ?, duration = ? WHERE id = ? AND idArtist = ?",
  );
  const { data } = stmt.run(
    newSongData.name,
    newSongData.duration,
    idSong,
    idArtist,
  );

  return data; // ha habido cambios
}

export function deleteSong(idArtist, idSong) {
  const stmt = db.prepare(
    "DELETE FROM songs AS s WHERE s.id = ? AND s.idArtist = ?",
  );
  const { data } = stmt.run(idSong, idArtist);

  return data;
}
