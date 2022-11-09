import '../sass/style.scss';
import { createHtmlElement, roundScore } from './utilities';

// AXIOS Test

const axios = require('axios');
let urbanList = null;
let scoresArr = [null, null];

// The following Map object will link position names to their respective array positions
const literalToPos = new Map();
literalToPos.set('first', 0).set('second', 1);

// The following Map object will link the array position to their respective positions name
const posToLiteral = new Map();
posToLiteral.set(0, 'first').set(1, 'second');

let citiesToCompare = [null, null]; // These values will change depending on the input submitted for the city search

// Selectors

const headerElement = document.querySelector('.page-header');

// Event Listeners

headerElement.addEventListener('input', function(e) {
    if (e.target.classList.contains("search-bar")) {
        let filteredList = filterCities(e.target.value, urbanList);
        let selectedList = e.target.id.replace("input", "suggestions");

        createDatalistOptions(selectedList,filteredList);
    }
} );

headerElement.addEventListener('click', function(e) {
    if (e.target.classList.contains('search-btn')) {
        e.preventDefault();

        let selectedInput = e.target.id.replace("submit-btn", "input");
        let selectedPos = literalToPos.get(selectedInput.substring(0, selectedInput.indexOf('-')));

        let scoresUrl = submitUrbanLink(document.getElementById(selectedInput).value, urbanList, selectedPos);
        requestUrbanAreaScore(scoresUrl, selectedPos);
    }
} );

headerElement.addEventListener('focusin', function(e) {
    if (e.target.classList.contains('search-bar')) {
        if (!urbanList) requestUrbanAreasList();
    }
} );

// Draw functions

export function drawCard(scoresArr, name) {

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

// Search bar related functions

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

    // Will return the link to access scores API endpoint from a city list matching the city name

    let found = false;
    for (let i=0; i<cityList.length; i++) {
        if (cityName == cityList[i].name) {
            let scoresUrl = `${cityList[i].href}scores/`;
            found = true;
            citiesToCompare[pos] = cityName;
            return scoresUrl;
        }
    }
    if (!found) alert('City not found!');
}

// API requests

function requestUrbanAreasList() {
    axios.get('https://api.teleport.org/api/urban_areas/').then(function (response) {
        urbanList = response.data._links["ua:item"];
    }).catch(function (error){
        console.log(error);
    });
};

function requestUrbanAreaScore(scoresUrl, pos) {
    axios.get(scoresUrl).then(function (response) {

        scoresArr[pos] = response.data["categories"];

        // Selects the corresponding card container where the card will be rendered
        const cardContainer = document.querySelector(`.${posToLiteral.get(pos)}-card-container`);

        cardContainer.innerHTML = '';
        cardContainer.appendChild(drawCard(scoresArr[pos], citiesToCompare[pos]));
       
        if (cardContainer.classList.contains('not-visible')) {
            cardContainer.classList.remove('not-visible');
        }

        const summaryContainer = document.querySelector(`.${posToLiteral.get(pos)}-summary-container`);
        summaryContainer.innerHTML = response.data["summary"];
        
        if (summaryContainer.classList.contains('not-visible')) {
            summaryContainer.classList.remove('not-visible');
        }
    }).catch(function (error){
        console.log(error);
    });
};