export const handleCellClick = (e, status, state) => {
    if (status === 'stopped') {
        const el = e.target;
        el.classList.toggle('active');

        const [x, y] = el.classList[1].split('-').slice(1);
    }
};
