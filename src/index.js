let option = `quotes`;
let searchAnime = false;
let searchChar = false;

document.addEventListener('DOMContentLoaded', () => {
    //fetchAnimeQuotes(option); 
    initializeFormsAndBtns();

});

function fetchAnimeQuotes(option){
    fetch(`https://animechan.vercel.app/api/${option}`)
    .then(resp => resp.json())
    .then(obj => {
        if(option === `available/anime`){
            loadAvailableAnime(obj);
        }
        else{
            loadAnimeQuotes(obj);
        }
    });
}

function loadAnimeQuotes(quoteObj){
    const quoteList = document.getElementById('quote-list');
    quoteList.textContent = '';
    document.getElementById('anime-list').textContent = '';

    for(let key in quoteObj){
        let li = makeQuote(quoteObj[key]);
        quoteList.appendChild(li);
    }
}

function loadAvailableAnime(animeObj){
    const animeList = document.getElementById('anime-list');
    animeList.textContent = '';
    document.getElementById('quote-list').textContent = '';

    for(let item in animeObj){
        //console.log(animeArr[item])
        let li = document.createElement('li');
        li.id = animeObj[item];
        li.textContent = animeObj[item];
        animeList.appendChild(li);
    }
}

function makeQuote(quoteObj){
    const ul = document.createElement('ul');
    ul.id = quoteObj['anime'];

    const blockQuote = document.createElement('blockquote');
    blockQuote.className = 'block-quote';

    const title = document.createElement('h4');
    title.className = 'title';
    title.textContent = quoteObj['anime'];

    const quote = document.createElement('p');
    quote.id = `${quoteObj['anime']} Quote`;
    quote.textContent = `"${quoteObj['quote']}"`;

    const character = document.createElement('footer');
    character.id = quoteObj['character'];
    character.textContent = `-${quoteObj['character']}`;

    blockQuote.appendChild(title);
    blockQuote.appendChild(quote);
    blockQuote.appendChild(character);
    blockQuote.appendChild(document.createElement('br'));
    ul.appendChild(blockQuote);

    return ul;
}

function formToggle(form, bool){

    bool = !bool;
    if(bool){
        form.style.display = "block";
    }
    else{
        form.style.display = "none";
    }

    return bool;
}

function initializeFormsAndBtns(){

    const searchAnimeBtn = document.getElementById('search-anime-btn');
    const searchAnimeForm = document.querySelector('.search-anime-form');

    const searchCharBtn = document.getElementById('search-char-btn');
    const searchCharForm = document.querySelector('.search-char-form');

    const tenQuotesBtn = document.getElementById('ten-random-quotes');
    const randomQuoteBtn = document.getElementById('random-quote');
    const availableAnimeBtn = document.getElementById('available-anime')

    searchAnimeForm.style.display = "none";
    searchCharForm.style.display = "none";

    searchAnimeBtn.addEventListener('click', () => {
        searchAnime = formToggle(searchAnimeForm, searchAnime);
    });

    searchCharBtn.addEventListener('click', () => {
        searchChar = formToggle(searchCharForm, searchChar);
    });

    tenQuotesBtn.addEventListener('click', () => {
        option = `quotes`;
        fetchAnimeQuotes(option);
    })

    randomQuoteBtn.addEventListener('click', () => {
        option = `random`;
        fetchAnimeQuotes(option);
    })

    availableAnimeBtn.addEventListener('click', () => {
        option = `available/anime`;
        fetchAnimeQuotes(option);
    })
}


