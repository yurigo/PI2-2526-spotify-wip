import Database from 'better-sqlite3';
import { nanoid } from "nanoid";

const db = new Database('db.sqlite', { verbose: console.log } );
// const stmt = db.prepare('SELECT * FROM artists');
// const data = stmt.all();
// console.log(data);

import { artists } from "./artists.js";
import songs from "./songs.js";

// import artists from "./artists.js";

export function findArtistById(id) {
    return artists.find(artista => artista.id === id);
}

export function countSongsByArtistId(id){
    return songs.filter(song => song.idArtist === id).length;
}

export function getAll(){
    const stmt = db.prepare('SELECT * FROM artists');
    const artists = stmt.all();
    return artists;
}

export function createArtist(artist){
    artist.id = nanoid();
    artists.push(artist);
    return artist;
}

export function updateArtist(id, newArtist){
    const found = findArtistById(id);
    found.name = newArtist.name;
    return found;
}

export const deleteArtist = (id) => {
    const found = findArtistById(id);
    artists = artists.filter((e => {
        return e.idArtist !== id
    }));

    return found;
}

export function x(){
    return "x"
}
export function y(){
    return "y"
}
export function z(){
    return "z"
}