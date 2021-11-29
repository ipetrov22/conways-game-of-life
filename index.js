const state = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

const getCell = (xIndex, yIndex) => {
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

const getTransformedCell = (xIndex, yIndex) => {
    const cell = getCell(xIndex, yIndex);

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
        .map((cords) => getCell(xIndex + cords[0], yIndex + cords[1]))
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

console.log(getTransformedCell(1, 1));
/* 
a b c
h 0 d
g f e

a = (x-1; y-1)
b = (x; y-1)
c = (x+1; y-1)
d = (x+1; y)
e = (x+1; y+1)
f = (x; y+1)
g = (x-1; y+1)
h = (x-1; y)
*/
