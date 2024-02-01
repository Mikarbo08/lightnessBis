import * as convert from "color-convert";

export const generatePalette = (hex) => {
    const colors = [];
    const [h, s] = convert.hex.hsl(hex);

    for (let i = 0; i <= 100; i += 10) {
        colors.push([h, s, i]);
    }

    return colors;
}

export const isHexColor = (hex) => /^#[0-9A-F]{6}$/i.test(hex);

export const hexToCSSHSL = (hex) => {
    const hsl = convert.hex.hsl(hex);
    return `${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%`;
}