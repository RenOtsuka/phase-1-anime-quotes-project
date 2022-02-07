document.addEventListener('DOMContentLoaded', () => {
    fetchAnimeQuotes();
});


function fetchAnimeQuotes(){
    fetch(`https://animechan.vercel.app/api/quotes`)
    .then(resp => resp.json())
    .then(obj => loadAnimeQuotes(obj));
}

