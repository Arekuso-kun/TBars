function RGBToHex(rgb) {
    // Turn "r, g, b" into [r,g,b]
    rgb = rgb.split(", ");

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function hexToRGB(h) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    return +r + ", " + +g + ", " + +b;
}

let settingsLoaded = false;

const Settings = document.querySelector(".settings");
const ToggleSecondsBar = document.getElementById("toggle-seconds-bar");
const ToggleSmoothBar = document.getElementById("toggle-smooth-bar");

const ToggleSettingsIcon = document.getElementById("toggle-settings-icon");
const ToggleBars = document.getElementById("toggle-bars");
const ToggleClockDate = document.getElementById("toggle-clock-date");
const ToggleChristmas = document.getElementById("toggle-christmas");

const Scale = document.getElementById("scale_slider");
const ScaleImg = document.getElementById("scale_image_slider");
const ContainImg = document.querySelector(".button-scale-img");

const ScaleLabel = document.querySelector(".slider-op1");
const ScaleImgLabel = document.querySelector(".slider-op2");

const BackgroundColor = document.getElementById("background-color");
const AccentColor = document.getElementById("accent-color");
const ElementsColor = document.getElementById("elements-color");

const CustomColorButton = document.querySelector("input[value='color_custom']")

// const color_pickers = document.querySelectorAll("input[name='color-picker']");

const root = document.querySelector(":root");
const color_radios = document.querySelectorAll("input[name='color']");

function LoadSettings() { // Every else represents the default value
    const _ToggleSecondsBar = localStorage.getItem("ToggleSecondsBar");
    if (_ToggleSecondsBar == "false")
        ToggleSecondsBar.checked = false;
    else
        ToggleSecondsBar.checked = true;

    const _ToggleSmoothBar = localStorage.getItem("ToggleSmoothBar");
    if (_ToggleSmoothBar == "false")
        ToggleSmoothBar.checked = false;
    else
        ToggleSmoothBar.checked = true;

    const _ToggleSettingsIcon = localStorage.getItem("ToggleSettingsIcon");
    if (_ToggleSettingsIcon == "false")
        ToggleSettingsIcon.checked = false;
    else
        ToggleSettingsIcon.checked = true;

    const _ToggleBars = localStorage.getItem("ToggleBars");
    if (_ToggleBars == "false")
        ToggleBars.checked = false;
    else
        ToggleBars.checked = true;

    const _ToggleClockDate = localStorage.getItem("ToggleClockDate");
    if (_ToggleClockDate == "false")
        ToggleClockDate.checked = false;
    else
        ToggleClockDate.checked = true;

    const _ToggleChristmas = localStorage.getItem("ToggleChristmas");
    if (_ToggleChristmas == "false")
        ToggleChristmas.checked = false;
    else
        ToggleChristmas.checked = true;

    const _Scale = localStorage.getItem("Scale");
    if (_Scale != null)
        Scale.value = _Scale;
    else
        Scale.value = 1;

    const _ScaleImg = localStorage.getItem("ScaleImg");
    const _ContainImg = localStorage.getItem("ContainImg");
    if (_ContainImg == "no-contain")
        ScaleImg.value = _ScaleImg;
    else {
        ScaleImg.value = 1;
        ContainImg.onclick();
    }
    const _BackgroundColor = localStorage.getItem("BackgroundColor")
    const _AccentColor = localStorage.getItem("AccentColor")
    const _ElementsColor = localStorage.getItem("ElementsColor")
    const _Theme = localStorage.getItem("Theme")
    if (_BackgroundColor != null)
        root.style.setProperty('--color_custom_DARK', _BackgroundColor);
    if (_AccentColor != null)
        root.style.setProperty('--color_custom_LIGHT', _AccentColor);
    if (_ElementsColor != null)
        root.style.setProperty('--color_custom_BRIGHT', _ElementsColor);
    if (_Theme != null)
        color_radios.forEach(color_box => {
            if (_Theme == color_box.value) {
                color_box.checked = true;
            }
        });
    // else
    // default
}

color_radios.forEach(color_box => {
    color_box.onclick = () => {
        if (settingsLoaded == true) {

        }
        root.style.setProperty('--background-color', "var(--" + color_box.value + "_DARK)");
        root.style.setProperty('--accent-color', "var(--" + color_box.value + "_LIGHT)");
        root.style.setProperty('--bright-color', "var(--" + color_box.value + "_BRIGHT)");

        let background_color = getComputedStyle(document.body).getPropertyValue('--background-color');
        let accent_color = getComputedStyle(document.body).getPropertyValue('--accent-color');
        let elements_color = getComputedStyle(document.body).getPropertyValue('--bright-color');

        BackgroundColor.value = RGBToHex(background_color);
        AccentColor.value = RGBToHex(accent_color);
        ElementsColor.value = RGBToHex(elements_color);

        localStorage.setItem("Theme", color_box.value);
        // console.log(RGBToHex(background_color));
        // console.log(color_box.value + " loaded !");
        // console.log(BackgroundColor.value);
    }
});

BackgroundColor.oninput = () => {
    CustomColorButton.checked = true;
    root.style.setProperty('--color_custom_DARK', hexToRGB(BackgroundColor.value));
    root.style.setProperty('--background-color', hexToRGB(BackgroundColor.value));
    localStorage.setItem("BackgroundColor", hexToRGB(BackgroundColor.value));
}

AccentColor.oninput = () => {
    CustomColorButton.checked = true;
    root.style.setProperty('--color_custom_LIGHT', hexToRGB(AccentColor.value));
    root.style.setProperty('--accent-color', hexToRGB(AccentColor.value));
    localStorage.setItem("AccentColor", hexToRGB(AccentColor.value));
}

ElementsColor.oninput = () => {
    CustomColorButton.checked = true;
    root.style.setProperty('--color_custom_BRIGHT', hexToRGB(ElementsColor.value));
    root.style.setProperty('--bright-color', hexToRGB(ElementsColor.value));
    localStorage.setItem("ElementsColor", hexToRGB(ElementsColor.value));
}

Settings.onclick = () => {
    document.querySelector(".dropdown").classList.toggle('active');
    console.log("Button clicked !");
}

ToggleSecondsBar.onclick = () => {
    if (ToggleSecondsBar.checked) {
        document.getElementById("second").style.display = "block";
        localStorage.setItem("ToggleSecondsBar", "true");
    }
    else {
        document.getElementById("second").style.display = "none";
        localStorage.setItem("ToggleSecondsBar", "false");
    }
}

ToggleSmoothBar.onclick = () => {
    if (ToggleSmoothBar.checked) {
        localStorage.setItem("ToggleSmoothBar", "true");
    }
    else {
        localStorage.setItem("ToggleSmoothBar", "false");
    }
}

ToggleSettingsIcon.onclick = () => {
    if (ToggleSettingsIcon.checked) {
        document.querySelector(".fa-gear").style.opacity = 1;
        localStorage.setItem("ToggleSettingsIcon", "true");
    }
    else {
        document.querySelector(".fa-gear").style.opacity = 0;
        localStorage.setItem("ToggleSettingsIcon", "false");
    }
}

ToggleBars.onclick = () => {
    if (ToggleBars.checked) {
        document.querySelector(".container-bars").style.display = "block";
        localStorage.setItem("ToggleBars", "true");
    }
    else {
        document.querySelector(".container-bars").style.display = "none";
        localStorage.setItem("ToggleBars", "false");
    }
}

ToggleClockDate.onclick = () => {
    if (ToggleClockDate.checked) {
        document.querySelector(".container-clock-date").style.display = "inline-block";
        localStorage.setItem("ToggleClockDate", "true");
    }
    else {
        document.querySelector(".container-clock-date").style.display = "none";
        localStorage.setItem("ToggleClockDate", "false");
    }
}

ToggleChristmas.onclick = () => {
    if (ToggleChristmas.checked) {
        document.querySelector(".container-christmas").style.display = "block";
        localStorage.setItem("ToggleChristmas", "true");
    }
    else {
        document.querySelector(".container-christmas").style.display = "none";
        localStorage.setItem("ToggleChristmas", "false");
    }
}

Scale.oninput = () => {
    document.querySelector(".container-left").style.scale = Scale.value;
    document.querySelector(".container-right").style.scale = Scale.value;
    ScaleLabel.innerHTML = "Scale    " + (Scale.value * 100).toFixed(0) + "%";
    // console.log(Scale.value);
    localStorage.setItem("Scale", Scale.value);
}

ScaleImg.oninput = () => {
    ScaleImgLabel.innerHTML = "Scale Image    " + (ScaleImg.value * 100).toFixed(0) + "%";
    if (document.querySelector(".background").style.backgroundSize != "contain")
        document.querySelector(".background").style.backgroundSize = (ScaleImg.value * 100).toFixed(0) + "%";
    if (settingsLoaded == true) {
        document.querySelector(".background").style.backgroundSize = (ScaleImg.value * 100).toFixed(0) + "%";
        localStorage.setItem("ScaleImg", ScaleImg.value);
        localStorage.setItem("ContainImg", "no-contain");
    }
}

ContainImg.onclick = () => {
    document.querySelector(".background").style.backgroundSize = "contain";
    localStorage.setItem("ContainImg", "contain");
}

LoadSettings();
color_radios.forEach(color_box => {
    if (color_box.checked)
        color_box.onclick();
});
ToggleSecondsBar.onclick();
ToggleSmoothBar.onclick();
ToggleSettingsIcon.onclick();
ToggleBars.onclick();
ToggleClockDate.onclick();
ToggleChristmas.onclick();
Scale.oninput();
ScaleImg.oninput();
settingsLoaded = true;