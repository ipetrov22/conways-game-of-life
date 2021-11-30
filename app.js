import { handleCellClick } from './helpers/eventHandlers.js';
(function () {
    const grid = document.querySelector('.grid');
    let status = 'stopped'

    const createElement = (tagName, className) => {
        const el = document.createElement(tagName);
        el.className = className;
        return el;
    };

    for (let y = 0; y < 20; y++) {
        const row = createElement('div', 'grid-row');
        for (let x = 0; x < 20; x++) {
            const cell = createElement('span', `grid-cell cell-${x}-${y}`);
            cell.addEventListener('click', (e) => handleCellClick(e, status));
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
})();
