let option = `quotes`;
let searchAnime = false;
let searchChar = false;

document.addEventListener('DOMContentLoaded', () => {
    fetchAnimeQuotes(option); 
    initializeForms();

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

function initializeForms(){

    const searchAnimeBtn = document.getElementById('search-anime-btn');
    const searchAnimeForm = document.querySelector('.search-anime-form');

    const searchCharBtn = document.getElementById('search-char-btn');
    const searchCharForm = document.querySelector('.search-char-form');

    searchAnimeForm.style.display = "none";
    searchCharForm.style.display = "none";

    searchAnimeBtn.addEventListener('click', () => {
        searchAnime = formToggle(searchAnimeForm, searchAnime);
    });

    searchCharBtn.addEventListener('click', () => {
        searchChar = formToggle(searchCharForm, searchChar);
    })    
}