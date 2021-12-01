export const getCell = (xIndex, yIndex, state) => {
    if (
        xIndex < 0 ||
        xIndex >= state[0].length ||
        yIndex < 0 ||
        yIndex >= state.length
    ) {
        return 0;
    }

    return state[yIndex][xIndex];
};

export const getTransformedCell = (xIndex, yIndex, state) => {
    const cell = getCell(xIndex, yIndex, state);

    const liveNeighbours = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
    ]
        .map((cords) => getCell(xIndex + cords[0], yIndex + cords[1], state))
        .reduce((acc, cur) => acc + cur);

    if (cell) {
        if (liveNeighbours < 2 || liveNeighbours > 3) {
            return 0;
        }

        return cell;
    } else {
        if (liveNeighbours === 3) {
            return 1;
        }

        return cell;
    }
};

export const resetState = (state) => {
    return state.map((row) => row.fill(0));
};
