import '../sass/style.scss';
import testConsole from './secondary';

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

function draw() {
    const el = document.createElement('div');
    el.innerHTML = "Test";
    el.classList.add('test-class');
    return el;
}

document.body.appendChild(draw());
testConsole();