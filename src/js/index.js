import '../sass/style.scss';
import testConsole from './secondary';

function testDraw() {
    const el = document.createElement('div');
    el.innerHTML = "Test";
    el.classList.add('test-class');
    return el;
}

document.body.appendChild(testDraw());
testConsole();