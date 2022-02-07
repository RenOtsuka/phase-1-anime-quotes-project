let option = `quotes`;
let searchAnime = false;

document.addEventListener('DOMContentLoaded', () => {
    fetchAnimeQuotes(option);
    const searchBtn = document.getElementById('search-anime-btn');
    const searchDiv = document.querySelector('.container');
    searchDiv.style.display = "none";
    
    searchBtn.addEventListener('click', () => {
        searchAnime = !searchAnime;
        if(searchAnime){
            searchDiv.style.display = "block";
        }
        else{
            searchDiv.style.display = "none";
        }
    })
});


function fetchAnimeQuotes(option){
    fetch(`https://animechan.vercel.app/api/${option}`)
    .then(resp => resp.json())
    .then(obj => loadAnimeQuotes(obj));
}

function loadAnimeQuotes(quoteObj){
    const divList = document.getElementById('quote-list');
    divList.textContent = '';

    for(let key in quoteObj){
        let li = makeQuote(quoteObj[key]);
        divList.appendChild(li);
    }
}

function makeQuote(quoteObj){
    const li = document.createElement('li');
    li.id = quoteObj['anime'];

    const blockQuote = document.createElement('blockquote');
    blockQuote.className = 'block-quote';

    const title = document.createElement('h4');
    title.className = 'title';
    title.textContent = quoteObj['anime'];

    const quote = document.createElement('p');
    quote.id = `${quoteObj['anime']} Quote`;
    quote.textContent = quoteObj['quote'];

    const character = document.createElement('footer');
    character.id = quoteObj['character'];
    character.textContent = `-${quoteObj['character']}`;

    blockQuote.appendChild(title);
    blockQuote.appendChild(quote);
    blockQuote.appendChild(character);
    li.appendChild(blockQuote);

    return li;
}
