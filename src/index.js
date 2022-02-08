let option = `quotes`;
let searchAnime = false;
let searchChar = false;
let pageNum = 1;

document.addEventListener('DOMContentLoaded', () => {
    //fetchAnimeQuotes(option); 
    initializeFormsAndBtns();

});

function fetchAnimeQuotes(option){
    fetch(`https://animechan.vercel.app/api/${option}`)
    .then(resp => resp.json())
    .then(obj => {
        if(option === 'available/anime'){
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
    
    if(option.includes('quotes')){
        if(option.includes(pageNum)){
            pageNav();
        }
        for(let key in quoteObj){
            let li = makeQuote(quoteObj[key]);
            quoteList.appendChild(li);
        }
    }
    else{
        let li = makeQuote(quoteObj);
        quoteList.appendChild(li);
    }
}

function loadAvailableAnime(animeObj){
    const animeList = document.getElementById('anime-list');
    animeList.textContent = '';
    document.getElementById('quote-list').textContent = '';

    const subTitle = document.createElement('h3');
    subTitle.style.textAlign = 'center';
    subTitle.textContent = 'Available Anime';
    animeList.appendChild(subTitle);
    
    for(let item in animeObj){
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

//used from Monsters lab
function pageNav(animeTitle){
    const backBtn = document.getElementById('back');
    const forwardBtn = document.getElementById('forward');

    backBtn.style.display = "block";
    forwardBtn.style.display = "block";

    backBtn.addEventListener('click', function(){
        if(pageNum > 1){
            pageNum--;
            if(option.includes('anime')){
                option = `quotes/anime?title=${animeTitle.toLowerCase()}&page=${pageNum}`; 
            }
            else{
                option = `quotes/character?name=${charName.toLowerCase()}&page=${pageNum}`;
            }
            fetchAnimeQuotes(option);  
        }
        else{
            alert('Can\'t go back anymore');
        }
    });

    forwardBtn.addEventListener('click', function(){
        pageNum++;
        fetchAnimeQuotes(option);
    })

}

function initializeFormsAndBtns(){

    const searchAnimeBtn = document.getElementById('search-anime-btn');
    const searchAnimeForm = document.querySelector('.search-anime-form');

    const searchCharBtn = document.getElementById('search-char-btn');
    const searchCharForm = document.querySelector('.search-char-form');

    const tenQuotesBtn = document.getElementById('ten-random-quotes');
    const randomQuoteBtn = document.getElementById('random-quote');
    const availableAnimeBtn = document.getElementById('available-anime');

    const backBtn = document.getElementById('back');
    const forwardBtn = document.getElementById('forward');

    searchAnimeForm.style.display = "none";
    searchCharForm.style.display = "none";

    backBtn.style.display = "none";
    forwardBtn.style.display = "none";

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

    searchAnimeForm.addEventListener('submit', e => {
        e.preventDefault();
        let animeTitle = Array.from(document.getElementsByClassName('input-text'))[0].value;
        option = `quotes/anime?title=${animeTitle.toLowerCase()}&page=${pageNum}`;
        fetchAnimeQuotes(option);
    });

    searchCharForm.addEventListener('submit', e => {
        e.preventDefault();
        let charName = Array.from(document.getElementsByClassName('input-text'))[1].value;
        option = `quotes/character?name=${charName.toLowerCase()}&page=${pageNum}`;
        fetchAnimeQuotes(option);
    })
}


