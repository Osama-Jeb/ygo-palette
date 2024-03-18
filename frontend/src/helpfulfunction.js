
const textColor = (background) => {
    const { r, g, b } = hexToRgb(background);

    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? 'text-black ' : 'text-white'
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}


const toHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }

    return hex;
};

export { textColor, toHex }