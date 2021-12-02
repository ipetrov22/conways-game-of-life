import {
    handleCellClick,
    handlePlayClick,
    handleStopClick,
} from './helpers/eventHandlers.js';
import { resetState, getTransformedCell } from './helpers/gridHelpers.js';

(function () {
    const grid = document.querySelector('.grid');
    const playBtn = document.querySelector('.play-pause-button');
    const stopBtn = document.querySelector('.stop-button');

    let status = 'stopped';
    let interval;
    let state = [];
    let transformedState = [];
    const activeCells = new Set();
    const cellsToCheck = new Set();

    const createElement = (tagName, className) => {
        const el = document.createElement(tagName);
        el.className = className;
        return el;
    };

    for (let y = 0; y < 20; y++) {
        const row = createElement('div', 'grid-row');
        for (let x = 0; x < 20; x++) {
            const cell = createElement('span', `grid-cell cell-${x}-${y}`);
            cell.addEventListener('click', (e) =>
                handleCellClick(e, status, state, activeCells)
            );
            row.appendChild(cell);
        }
        grid.appendChild(row);
        state.push(new Array(20).fill(0));
        transformedState.push(new Array(20).fill(0));
    }

    const updateStatus = (newStatus) => {
        status = newStatus;
    };

    const start = () => {
        interval = setInterval(() => {
            if (!state.some((row) => row.includes(1))) {
                clearInterval(interval);
                playBtn.textContent = 'PLAY';
                stopBtn.disabled = true;
                status = 'stopped';
                activeCells.clear();
                return;
            }

            activeCells.forEach((cords) => {
                const [x, y] = cords.split('-').map(Number);
                cellsToCheck.add(`${x}-${y}`);

                [
                    [-1, -1],
                    [0, -1],
                    [1, -1],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [-1, 1],
                    [-1, 0],
                ].forEach((cords) => {
                    const [plusX, plusY] = cords;
                    const xIndex = x + plusX;
                    const yIndex = y + plusY;

                    if (
                        xIndex >= 0 &&
                        xIndex < state[0].length &&
                        yIndex >= 0 &&
                        yIndex < state.length
                    ) {
                        cellsToCheck.add(`${xIndex}-${yIndex}`);
                    }
                });
            });

            cellsToCheck.forEach((cell) => {
                const [x, y] = cell.split('-').map(Number);
                const cellValue = getTransformedCell(x, y, state);
                transformedState[y][x] = cellValue;
                const cellEl = document.querySelector(`.cell-${x}-${y}`);

                if (cellValue) {
                    activeCells.add(`${x}-${y}`);
                    cellEl.classList.add('active');
                } else {
                    activeCells.delete(`${x}-${y}`);
                    cellEl.classList.remove('active');
                }
            });

            state = JSON.parse(JSON.stringify(transformedState));
            transformedState = resetState(transformedState);
            cellsToCheck.clear();
        }, 500);
    };

    const pause = () => {
        clearInterval(interval);
    };

    const stop = () => {
        clearInterval(interval);
        state = resetState(state);
        activeCells.clear();

        [...document.querySelectorAll('.grid-cell.active')].forEach((cell) =>
            cell.classList.remove('active')
        );
    };

    playBtn.addEventListener('click', (e) =>
        handlePlayClick(e, status, updateStatus, start, pause)
    );
    stopBtn.addEventListener('click', (e) =>
        handleStopClick(e, state, status, updateStatus, stop)
    );
})();
