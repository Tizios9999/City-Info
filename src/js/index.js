import '../sass/style.scss';
import testConsole from './secondary';

// AXIOS Test

const axios = require('axios');
let urbanList = null;

axios.get('https://api.teleport.org/api/urban_areas/').then(function (response) {
    console.log(response.data._links["ua:item"]);
    urbanList = response.data._links["ua:item"];
}).catch(function (error){
    console.log(error);
}).then(function() {
    console.log('Request ended.')
});


// Test variables

// let urbanList = [
//     {
//         "href": "https://api.teleport.org/api/urban_areas/slug:aarhus/", 
//         "name": "Aarhus"
//     }, 
//     {
//         "href": "https://api.teleport.org/api/urban_areas/slug:adelaide/", 
//         "name": "Adelaide"
//     }, 
//     {
//         "href": "https://api.teleport.org/api/urban_areas/slug:albuquerque/", 
//         "name": "Albuquerque"
//     }, 
//     {
//         "href": "https://api.teleport.org/api/urban_areas/slug:almaty/", 
//         "name": "Almaty"
//     }, 
//     {
//         "href": "https://api.teleport.org/api/urban_areas/slug:amsterdam/", 
//         "name": "Amsterdam"
//     }, 
//     {
//         "href": "https://api.teleport.org/api/urban_areas/slug:anchorage/", 
//         "name": "Anchorage"
//     }, 
//     {
//         "href": "https://api.teleport.org/api/urban_areas/slug:ankara/", 
//         "name": "Ankara"
//     }, 
// ];

let firstCityScores = [
    {
        "color":"#040445",
        "name":"Housing",
        "score_out_of_10": 6.3095, 
    },
    {
        "color":"#f3c32c",
        "name":"Cost of Living",
        "score_out_of_10": 4.692,
    },
    {
        "color":"#34565c",
        "name":"Startups",
        "score_out_of_10": 3.1365,
    },
    {
        "color":"#f3c32c",
        "name":"Venture Capital",
        "score_out_of_10": 2.64,
    },
    {
        "color":"#f3c32c",
        "name":"Travel Connectivity",
        "score_out_of_10": 1.17765,
    },
    {
        "color":"#f3c32c",
        "name":"Business Freedom",
        "score_out_of_10": 9.399666667,
    },
    {
        "color":"#f3c32c",
        "name":"TEST X",
        "score_out_of_10": 2,
    },
    {
        "color":"#f3c32c",
        "name":"TEST Y",
        "score_out_of_10": 5.512,
    },
    {
        "color":"#f3c32c",
        "name":"TEST Y",
        "score_out_of_10": 5.512,
    },
    {
        "color":"#f3c32c",
        "name":"TEST Y",
        "score_out_of_10": 5.512,
    },
    {
        "color":"#f3c32c",
        "name":"TEST Y",
        "score_out_of_10": 5.512,
    },
    {
        "color":"#f3c32c",
        "name":"TEST Y",
        "score_out_of_10": 5.512,
    },
];

let secondCityScores = [
    {
        "color":"#f3c32c",
        "name":"Housing",
        "score_out_of_10": 5.1945, 
    },
    {
        "color":"#f3c32c",
        "name":"Cost of Living",
        "score_out_of_10": 4.801,
    },
    {
        "color":"#222222",
        "name":"Startups",
        "score_out_of_10": 5.1945,
    },
    {
        "color":"#444444",
        "name":"Venture Capital",
        "score_out_of_10": 3.286,
    },
    {
        "color":"#f3c32c",
        "name":"Travel Connectivity",
        "score_out_of_10": 6.683,
    },
    {
        "color":"#f3c32c",
        "name":"Business Freedom",
        "score_out_of_10": 5.512,
    },
    {
        "color":"#f3c32c",
        "name":"TEST Y",
        "score_out_of_10": 5.512,
    },
];

let citiesToCompare = [null, null]; // These values will change depending on the input submitted for the city search

// Helper functions

function createHtmlElement(tag, classes = '', htmlContent = '') {
    const el = document.createElement(`${tag}`);
    if (classes) el.className = classes;
    el.innerHTML = htmlContent;

    return el;
}

function roundScore(score) {
    return Math.round(score*10)/10;
}

// Search bar related functions

function suggestCities(searchString, objArr) {
    
    objArr.forEach(function(entry) { // will be a filter method later on that will return the list of results
        if (entry.name.toLowerCase().includes(searchString.toLowerCase())) {
            console.log(entry.name);
        }
    } )
}

function filterCities(searchString, objArr) {
    
    if (searchString == "") return;
    let filteredList = objArr.map(objArr => objArr.name).filter(entry => entry.toLowerCase().includes(searchString.toLowerCase()));
    
    if (filteredList.length == 1 && filteredList[0].toLowerCase() === searchString.toLowerCase()) return; // this will ensure that the list of suggestions will be empty when I don't need it anymore.
    
    return filteredList;
    } 

function createDatalistOptions(datalistId, arr) { 
    const datalist = document.getElementById(datalistId);
    datalist.innerHTML = ""; // the datalist options are erased first

    if (!arr) return;

    arr.forEach(function(item) {
        let option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
    })


}

function submitUrbanLink(cityName, cityList, pos) {
    let found = false;
    console.log(cityName);
    for (let i=0; i<cityList.length; i++) {
        if (cityName == cityList[i].name) {
            console.log(`${cityList[i].href}scores/`);
            found = true;
            citiesToCompare[pos] = cityName;
            console.log(citiesToCompare);
            return;
        }
    }
    if (!found) console.log('Not found!');
}

// Selectors

const headerElement = document.querySelector('.page-header');
const cardsWrapper = document.querySelector('.cards-wrapper');

// Forms Event Listeners

headerElement.addEventListener('input', function(e) {
    if (e.target.classList.contains("search-bar")) {
        let filteredList = filterCities(e.target.value, urbanList);
        let selectedList = e.target.id == "first-city-input" ? "search-city-suggestions" : "second-city-suggestions";
        
        createDatalistOptions(selectedList,filteredList);
    }
} );

headerElement.addEventListener('click', function(e) {
    if (e.target.classList.contains('search-btn')) {
        e.preventDefault();
        console.log(e.target.id);
        let selectedInput = e.target.id == "first-city-submit-btn" ? "first-city-input" : "second-city-input";
        let selectedPos = selectedInput == "first-city-input" ? 0 : 1;

        submitUrbanLink(document.getElementById(selectedInput).value, urbanList, selectedPos);
    }
} );

function drawCard(scoresArr, name) {

    const card = createHtmlElement('div', 'card');
    const cityTitle = createHtmlElement('h4', 'city-title', name);
    const urbanScoresWrapper = createHtmlElement('div', 'urban-scores-wrapper');
    card.append(cityTitle, urbanScoresWrapper);

    // From here I need to create an individual score for every category

    scoresArr.forEach(function(categoryScore) {
        urbanScoresWrapper.append(renderScoreSection(categoryScore));
    })
    

    return card;
}

function renderBar(categoryScore) {
    const bar = document.createElement('div');
    const fillWidth = Math.round(categoryScore.score_out_of_10*10);
    bar.classList.add('bar');
    const meterFill = document.createElement('span');
    meterFill.classList.add('meter-fill');
    meterFill.style.backgroundColor = categoryScore.color;
    meterFill.style.width = `${fillWidth}%`; // width must come from API data
    bar.appendChild(meterFill);

    return bar;
}

function renderUrbanScoreLabel(categoryScore) {
    const scoreLabel = createHtmlElement('div', 'score-label');
    const categoryLabel = createHtmlElement('em', '',`${categoryScore.name}: `);

        scoreLabel.appendChild(categoryLabel);

        const numberScoreLabel = createHtmlElement('strong', '',`${roundScore(categoryScore.score_out_of_10)}`)  // needs to be replaced with data from API

        scoreLabel.append(numberScoreLabel, '/10');

        return scoreLabel;
}

function renderScoreSection(categoryScore) {

    const scoreWrapper = document.createElement('div');
    scoreWrapper.classList.add('score-wrapper');
    
    scoreWrapper.appendChild(renderUrbanScoreLabel(categoryScore));

    scoreWrapper.appendChild(renderBar(categoryScore));

    return scoreWrapper;
}



suggestCities('N', urbanList);
console.log("-------------------");

console.log(document.getElementById("second-city-input").value);
cardsWrapper.appendChild(drawCard(firstCityScores, 'First City'));
cardsWrapper.appendChild(drawCard(secondCityScores, 'Second City'));

testConsole();