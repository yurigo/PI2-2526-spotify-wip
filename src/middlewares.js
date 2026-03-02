import * as artistsDao from "./artists.dao.js";

export function verificarArtista(req, res, next){
    const idArtist = Number(req.params.idArtist);
    // const found = artists.find((e) => e.id === idArtist);
    const found = artistsDao.findArtistById(idArtist);

    if (!found) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }

    next();
}