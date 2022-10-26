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

const firstObject = {
    name: 'City One',
    score: 8.5343,
    position: 'urban-0',
}

const secondObject = {
    name: 'City Two',
    score: 7.03223,
    position: 'urban-1',
}

const objArr = [firstObject, secondObject];

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
    
    urbanScoresWrapper.appendChild(renderScoreSection(urbanArr[0].name, urbanArr[0].score, urbanArr[0].position));

    urbanScoresWrapper.appendChild(renderScoreSection(urbanArr[1].name, urbanArr[1].score, urbanArr[1].position));

    return card;
}

function renderBar(urbanCounter, points) {
    const bar = document.createElement('div');
    const fillWidth = Math.round(points*10);
    bar.classList.add('bar');
    const meterFill = document.createElement('span');
    meterFill.classList.add('meter-fill');
    meterFill.classList.add(urbanCounter); // needs to be a parameter to avoid repetitions
    meterFill.style.width = `${fillWidth}%`; // width must come from API data
    bar.appendChild(meterFill);

    return bar;
}

function renderUrbanScoreLabel(urbanAreaName, categoryScore) {
    const scoreLabel = document.createElement('div');
    scoreLabel.classList.add('score-label');
    const urbanAreaLabel = document.createElement('em');
        const urbanAreaTextNode = document.createTextNode(`${urbanAreaName}: `); // needs to be replaced with data from API
        urbanAreaLabel.appendChild(urbanAreaTextNode);
        scoreLabel.appendChild(urbanAreaLabel);

        // add the points, first part in strong tags

        const numberScoreLabel = document.createElement('strong');
        const numberScoreTextNode = document.createTextNode(`${roundScore(categoryScore)}`); // needs to be replaced with data from API
        numberScoreLabel.appendChild(numberScoreTextNode);
        scoreLabel.appendChild(numberScoreLabel);
        const outOfTenLabel = document.createTextNode("/10");
        scoreLabel.appendChild(outOfTenLabel);

        return scoreLabel;
}

function renderScoreSection(urbanAreaName, points, counter) {

    const scoreWrapper = document.createElement('div');
    scoreWrapper.classList.add('score-wrapper');
    
    scoreWrapper.appendChild(renderUrbanScoreLabel(urbanAreaName, points));

    scoreWrapper.appendChild(renderBar(counter, points));

    return scoreWrapper;
}

function roundScore(score) {
    return Math.round(score*10)/10;
}

cardsWrapper.appendChild(drawCard('HEALTHCARE', objArr));
cardsWrapper.appendChild(drawCard('POLITICS', objArr));

testConsole();