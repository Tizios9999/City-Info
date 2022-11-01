import '../sass/style.scss';
import testConsole from './secondary';

const cardsWrapper = document.querySelector('.cards-wrapper');

let urbanList = [
        {
            "href": "link1", 
            "name": "San Diego"
        }, 
        {
            "href": "link2", 
            "name": "Domodossola"
        }, 
        {
            "href": "link3", 
            "name": "Milano"
        }, 
        {
            "href": "link4", 
            "name": "Mestre"
        }, 
        {
            "href": "link5", 
            "name": "San Francisco"
        }, 
        {
            "href": "link6", 
            "name": "Santiago"
        }, 
];

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
    arr.forEach(function(item) {
        let option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
    })


}

// Selectors

const headerElement = document.querySelector('.page-header');

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
    }
} );


// The following objects are created for every category

const firstCityObject = {
    name: 'City One',
    score: 8.5343,
}

const secondCityObject = {
    name: 'City Two',
    score: 7.03223,
}

const categoryCardArr = [firstCityObject, secondCityObject];

function drawCard(category, urbanArr) {

    const card = document.createElement('div');
    const categoryTitleNode = document.createElement('h4');
    const categoryTitleText = document.createTextNode(category); // needs to be replaced with data from API
    card.classList.add('card');

    // Add category title
    card.appendChild(categoryTitleNode);
    categoryTitleNode.appendChild(categoryTitleText);
    
    // Add Urban Scores Wrapper below the category title
    const urbanScoresWrapper = document.createElement('div');
    urbanScoresWrapper.classList.add('urban-scores-wrapper');
    card.appendChild(urbanScoresWrapper);

    urbanArr.forEach(function(urbanObj, i) {
        urbanScoresWrapper.appendChild(renderScoreSection(urbanObj, i));
    })

    return card;
}

function renderBar(urbanCounter, points) {
    const bar = document.createElement('div');
    const fillWidth = Math.round(points*10);
    bar.classList.add('bar');
    const meterFill = document.createElement('span');
    meterFill.classList.add('meter-fill');
    meterFill.classList.add(`urban-${urbanCounter}`); // needs to be a parameter to avoid repetitions
    meterFill.style.width = `${fillWidth}%`; // width must come from API data
    bar.appendChild(meterFill);

    return bar;
}

function renderUrbanScoreLabel(urbanObj) {
    const scoreLabel = document.createElement('div');
    scoreLabel.classList.add('score-label');
    const urbanAreaLabel = document.createElement('em');
        const urbanAreaTextNode = document.createTextNode(`${urbanObj.name}: `); // needs to be replaced with data from API
        urbanAreaLabel.appendChild(urbanAreaTextNode);
        scoreLabel.appendChild(urbanAreaLabel);

        // add the points, first part in strong tags

        const numberScoreLabel = document.createElement('strong');
        const numberScoreTextNode = document.createTextNode(`${roundScore(urbanObj.score)}`); // needs to be replaced with data from API
        numberScoreLabel.appendChild(numberScoreTextNode);
        scoreLabel.appendChild(numberScoreLabel);
        const outOfTenLabel = document.createTextNode("/10");
        scoreLabel.appendChild(outOfTenLabel);

        return scoreLabel;
}

function renderScoreSection(urbanObj, counter) {

    const scoreWrapper = document.createElement('div');
    scoreWrapper.classList.add('score-wrapper');
    
    scoreWrapper.appendChild(renderUrbanScoreLabel(urbanObj));

    scoreWrapper.appendChild(renderBar(counter, urbanObj.points));

    return scoreWrapper;
}

function roundScore(score) {
    return Math.round(score*10)/10;
}

cardsWrapper.appendChild(drawCard('HEALTHCARE', categoryCardArr));
cardsWrapper.appendChild(drawCard('POLITICS', categoryCardArr));
cardsWrapper.appendChild(drawCard('ECONOMY', categoryCardArr));

suggestCities('N', urbanList);
console.log("-------------------");


testConsole();