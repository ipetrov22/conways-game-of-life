export const handleCellClick = (e, status) => {
    if (status === 'stopped') {
        const el = e.target;
        el.classList.toggle('active');
    }
};
