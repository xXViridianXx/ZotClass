const StatusColor = (status) => {
    switch (status) {
        case 'OPEN':
            return '#aaf683';
        case 'FULL':
            return '#ff5a5f';
        case 'Waitl':
            return '#ffd97d';
        default:
            return 'white';
    }
};

export default StatusColor