(function () {
    const grid = document.querySelector('.grid');
    console.log(grid)

    const createElement = (tagName, className) => {
        const el = document.createElement(tagName);
        el.className = className;
        return el;
    };

    for (let y = 0; y < 20; y++) {
        const row = createElement('div', 'grid-row');
        for (let x = 0; x < 20; x++) {
            const cell = createElement('span', `grid-cell cell-${x}-${y}`);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
})();
