'use strict'

class Moveisdata {
    constructor(title, overview, voteAvarege, totalVotes, imgUrl, popularity, releaseDate ) {
        this.title = title;
        this.overview = overview;
        this.voteAvarege = voteAvarege;
        this.totalVotes = totalVotes;
        this.imgUrl = imgUrl;
        this.popularity = popularity;
        this.releaseDate = releaseDate;
    };
}

module.exports = Moveisdata;