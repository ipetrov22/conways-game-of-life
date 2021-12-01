import { handleCellClick, handlePlayClick } from './helpers/eventHandlers.js';

(function () {
    const grid = document.querySelector('.grid');
    const playBtn = document.querySelector('.play-pause-button');
    const stopBtn = document.querySelector('.stop-button');

    let status = 'stopped';
    let state = [];

    const createElement = (tagName, className) => {
        const el = document.createElement(tagName);
        el.className = className;
        return el;
    };

    const updateStatus = (newStatus) => {
        status = newStatus;
    };

    playBtn.addEventListener('click', (e) => handlePlayClick(e, status, updateStatus));

    for (let y = 0; y < 20; y++) {
        const row = createElement('div', 'grid-row');
        for (let x = 0; x < 20; x++) {
            const cell = createElement('span', `grid-cell cell-${x}-${y}`);
            cell.addEventListener('click', (e) =>
                handleCellClick(e, status, state)
            );
            row.appendChild(cell);
        }
        grid.appendChild(row);
        state.push(new Array(20).fill(0));
    }
})();
