import { generatePalette, isHexColor, hexToCSSHSL } from "./modules/utils";
import { Color } from "./modules/Color";
import * as convert from "color-convert";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf();


const formElement = document.querySelector("form");
const handleForm = (e) => {
    try {
        e.preventDefault();
        const inputValue = e.target.firstElementChild.value;
        if (!isHexColor(inputValue)) {
            throw new Error(`${inputValue} is not a valid Hexadecimal color`)
        }

        const palette = generatePalette(inputValue);
        displayColors(inputValue, palette);
        console.log(inputValue, palette);
    } catch (error) {
        notyf.error(error.message);
    }
}
formElement.addEventListener("submit", (handleForm));


const colorContainer = document.querySelector("main")
const displayColors = (input, palette) => {

    colorContainer.innerHTML = "";


    const header = document.querySelector("header");

    header.classList.add("minimized");


    document.documentElement.style.setProperty(
        "--shadow-color",
        hexToCSSHSL(input)
    );

    const gradientColors = [
        0,
        Math.round(palette.length / 2),
        palette.length - 1
    ].map((index) => `#${convert.hsl.hex(palette[index])}`);

    document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(
        ","
    )}`;

    document.body.style.backgroundSize = `400% 400%`;
    palette.map((c) => new Color(c).display(colorContainer));
};


const handleClick = async (e) => {
    const color = e.target.closest(".color").dataset.color;
    await navigator.clipboard.writeText(color);
    notyf.success(`copied ${color} to clipboard`);
}
colorContainer.addEventListener("click", (handleClick));