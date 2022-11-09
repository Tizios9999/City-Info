// Helper functions here

export function createHtmlElement(tag, classes = '', htmlContent = '') {
    const el = document.createElement(`${tag}`);
    if (classes) el.className = classes;
    el.innerHTML = htmlContent;

    return el;
}

export function roundScore(score) {
    return Math.round(score*10)/10;
}