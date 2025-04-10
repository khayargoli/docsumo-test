export const getRandomColor = (seed: string): string => {
    const colors = [
        '#FFB6C1',
        '#FFD700',
        '#98FB98',
        '#87CEFA', 
        '#DDA0DD',
        '#FFA07A',
        '#20B2AA',
        '#778899',
    ];
    return colors[seed.charCodeAt(0) % colors.length];
};


export const getInitials = (label: string) => {
    const words = label.trim().split(' ');
    return words.length === 1 ? words[0][0] : words[0][0] + words[1][0];
};
