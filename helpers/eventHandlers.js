import { getCell, resetState } from './gridHelpers.js';

export const handleCellClick = (e, status, state) => {
    if (status === 'stopped') {
        const el = e.target;
        el.classList.toggle('active');

        const [x, y] = el.classList[1].split('-').slice(1);
        const cellValue = getCell(x, y, state);
        state[y][x] = cellValue ? 0 : 1;
    }
};

export const handlePlayClick = (e, status, updateStatus) => {
    if (status === 'stopped' || status === 'paused') {
        updateStatus('playing');
        e.target.textContent = 'PAUSE';
        document.querySelector('.stop-button').disabled = false;
    } else if (status === 'playing') {
        updateStatus('paused');
        e.target.textContent = 'PLAY';
    }
};

export const handleStopClick = (e, state, status, updateStatus) => {
    if (status !== 'stopped') {
        updateStatus('stopped');
        resetState(state);
        e.target.disabled = true;
        document.querySelector('.play-pause-button').textContent = 'PLAY';
    }
};
