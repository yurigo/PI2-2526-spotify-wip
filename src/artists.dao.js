import Database from "better-sqlite3";
import { nanoid } from "nanoid";

const db = new Database("db.sqlite", { verbose: console.log });

export function findArtistById(id) {
  const stmt = db.prepare("SELECT * FROM artists WHERE id = ?");
  const artist = stmt.get(id);
  return artist;
}

// export function countSongsByArtistId(id) {
//   return songs.filter((song) => song.idArtist === id).length;
// }

export function getAll() {
  const stmt = db.prepare("SELECT * FROM artists");
  const artists = stmt.all();
  return artists;
}

export function createArtist(artist) {
  const stmt = db.prepare("INSERT INTO artists (name) VALUES (?)");

  // const valor = stmt.run(artist.name);  // --->  valor = { changes: 1, lastInsertedRowid: 5629874 }
  // const lastInsertRowid = valor.lastInsertRowid;

  const { lastInsertRowid } = stmt.run(artist.name); // deconstrucción de un objeto.

  return lastInsertRowid;
}

export function updateArtist(id, newArtist) {
  // const found = findArtistById(id);
  const stmt = db.prepare("UPDATE artists SET name = ? WHERE id = ?");
  const data = stmt.run(newArtist.name, id);

  return data.changes > 0; // ha habido cambios
}

export const deleteArtist = (idArtist) => {
  const stmt = db.prepare("DELETE FROM songs AS s WHERE s.idArtist = ?");
  stmt.run(idArtist);

  const stmt2 = db.prepare("DELETE FROM artists WHERE id = ?");
  const data2 = stmt2.run(idArtist);

  return data2;
};
