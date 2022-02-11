let option = `quotes`; //str var. to keep track of which funcionality is being used
let searchAnime = false; //bool to toggle anime form
let searchChar = false; //bool to toggle character form
let pageNum = 1; // var. to load pages
let animeLength = 0; //length used to splice 'option' for pagination
let charLength = 0; //length used to splice 'option' for pagination

document.addEventListener('DOMContentLoaded', () => {
    //fetchAnimeQuotes(option); 
    initializeFormsAndBtns();

});

//gets quotes/anime from API
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
    })
    .catch(error => alert(error));
}

//loads quote(s) to the document
function loadAnimeQuotes(quoteObj){
    const quoteList = document.getElementById('quote-list');
    quoteList.textContent = '';
    document.getElementById('anime-list').textContent = '';
    document.getElementById('back').style.display = 'none';
    document.getElementById('forward').style.display = 'none';

    if(option.includes('quotes')){

        if(option.includes(pageNum) && option.includes('anime')){
            pageNav(option.slice(19, 19 + animeLength));
        }
        else if(option.includes(pageNum) && option.includes('character')){
            pageNav(option.slice(21, 20 + animeLength));
        }

        for(let key in quoteObj){
            let li = makeQuote(quoteObj[key]);
            if(li === undefined){

            }
            quoteList.appendChild(li);
        }
    }
    else{ //loads random quote
        let li = makeQuote(quoteObj);
        quoteList.appendChild(li);
    }
}

//loads all available anime from the API
function loadAvailableAnime(animeObj){
    const animeList = document.getElementById('anime-list');
    animeList.textContent = '';
    document.getElementById('quote-list').textContent = '';
    document.getElementById('back').style.display = 'none';
    document.getElementById('forward').style.display = 'none';


    const subTitle = document.createElement('h3');
    //subTitle.style.textAlign = 'center';
    subTitle.textContent = 'Available Anime';
    animeList.appendChild(subTitle);
    
    for(let item in animeObj){
        let li = document.createElement('li');
        li.id = animeObj[item];
        li.textContent = animeObj[item];
        //li.style.textAlign = 'center';
        animeList.appendChild(li);
        animeList.appendChild(document.createElement('br'));
    }
}

//creates the element to display the quote on the page
function makeQuote(quoteObj){

   

    const ul = document.createElement('ul');
    ul.id = quoteObj['anime'];

    if(quoteObj['quote'] === undefined && option.includes('anime')){
        ul.textContent = "Anime not found";
        ul.style.textAlign = "center";
        return ul;
    }
    else if(quoteObj['quote'] === undefined && option.includes('character')){
        ul.textContent = "Character not found";
        ul.style.textAlign = "center";
        return ul;
    }

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

//toggle the form from hiding to showing and vice versa
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

//function to naviagte through quotes
//used from Monsters lab
function pageNav(animeOption){

    const backBtn = document.getElementById('back');
    const forwardBtn = document.getElementById('forward');

    backBtn.style.display = "block";
    forwardBtn.style.display = "block";

    backBtn.addEventListener('click', () => {
        if(pageNum > 1){
            pageNum--;
            if(option.includes('anime')){
                option = `quotes/anime?title=${animeOption.toLowerCase()}&page=${pageNum}`; 
            }
            else{
                option = `quotes/character?name=${animeOption.toLowerCase()}&page=${pageNum}`;
            }
            fetchAnimeQuotes(option);  
        }
        else{
            alert('Can\'t go back anymore');
        }
    });

    forwardBtn.addEventListener('click', () => {
        pageNum++;
        if(option.includes('anime')){
            option = `quotes/anime?title=${animeOption.toLowerCase()}&page=${pageNum}`; 
        }
        else{
            option = `quotes/character?name=${animeOption.toLowerCase()}&page=${pageNum}`;
        }
        fetchAnimeQuotes(option);
    })
}

//initialize all necessary forms and buttons on the document
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
        animeLength = animeTitle.length;
        option = `quotes/anime?title=${animeTitle.toLowerCase()}&page=${pageNum}`;
        fetchAnimeQuotes(option);
    });

    searchCharForm.addEventListener('submit', e => {
        e.preventDefault();
        let charName = Array.from(document.getElementsByClassName('input-text'))[1].value;
        charLength = charName.length;
        option = `quotes/character?name=${charName.toLowerCase()}&page=${pageNum}`;
        fetchAnimeQuotes(option);
    })
}


