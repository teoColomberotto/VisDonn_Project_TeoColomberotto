const API_KEY = "785f42c3101ade642b02a9de5071725a";
const DATA_FORMAT = "json"
const DATA_LIMIT = '10000'
const POPULAR_ARTISTS = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists";
const SONGS_BY_ARTIST = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks";
const ARTIST_ALBUMS = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums";
const SONGS_BY_ALBUM = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo";
//All these function are not implemented in this release --Attention
const getAveregeSongsTimeByArtist = async (artist = "Queen") => {
    getAllAlbumsByArtistes("Queen").then(albums =>{
        //console.log(albumss);
        return Promise.all(
            albums.map(album => getAllInfoByAlbum(artist, album.name))
        ).then(infoss => {
            let nbTotal = infoss.map(album =>{
                nbTracks = album.tracks.track;
                array = nbTracks.length;
                return array;
            })
            let totalDuration = infoss.map(album =>{
                tracks = album.tracks.track;
                let durations = tracks.map(track =>{   
                    return track.duration;
                })
                console.log(durations);
                
            })
            //console.log(nbTotal.reduce(function(a,b){return a + b}));  
            
            console.log(tracks.reduce(function(a,b){return a + b}));   
        })

    })
}
const getAllAlbumsByArtistes = artistid => {
    var url = new URL(ARTIST_ALBUMS),
    params = {artist: artistid, api_key:API_KEY, format:DATA_FORMAT}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
     return fetch(url)
    .then(response => response.json())
    .then(r => r.topalbums.album)  
}
const getArtistes = () => {
    var url = new URL(POPULAR_ARTISTS),
    params = {api_key:API_KEY, format:DATA_FORMAT}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
     return fetch(url)
    .then(response => response.json())    
}
const getAllInfoByAlbum = (artistid, albumId) => {
    var url = new URL(SONGS_BY_ALBUM),
    params = {artist: artistid, album: albumId, api_key:API_KEY, format:DATA_FORMAT}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
     return fetch(url)
    .then(response => response.json())   
    .then(r => r.album) 
}

  let artistTest = getArtistes().then(artistss => {
      let artists = artistss.artists.artist;
      artists.forEach(artist => {
        
        /*getAllAlbumsByArtistes(artist.name).then(albumss =>{
            let albums = albumss.topalbums.album
            albums.forEach(album => {
                getAllInfoByAlbum(artist.name, album.name).then(infoss =>{
                    let tracks = infoss.album.tracks.track;
                    let nbTracks = tracks.length;
                    //console.log(nbTracks);
                })
            })
        })*/
      }) 
        
  });
  //let albumTest = getAllAlbumsByArtistes("Queen").then(console.log);
  //let infoTest = getAllInfoByAlbum("Queen", "A night at the opera").then(console.log);
  getAveregeSongsTimeByArtist();