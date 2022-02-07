document.addEventListener('DOMContentLoaded', () => {
    fetchAnimeQuotes();
});


function fetchAnimeQuotes(){
    fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1`)
    .then(resp => resp.json())
    .then(obj => loadAnimeQuotes(obj));
}

