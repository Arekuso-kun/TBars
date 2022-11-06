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

var wL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

setInterval(function () {
    const d_now = new Date();
    const d_zero = new Date(d_now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const d_christmas = new Date(d_now.getFullYear(), 11, 25, 0, 0, 0, 0);
    const d_last_christmas = new Date(d_now.getFullYear() - 1, 11, 25, 0, 0, 0, 0);

    // d_now.setMonth(11);
    // d_now.setDate(26);
    // d_now.setHours(0);
    // d_now.setMinutes(0);
    // d_now.setSeconds(0);

    let t = d_now.getTime() / 100 - d_christmas.getTime() / 100;
    if (t > 0) {
        d_last_christmas.setFullYear(d_last_christmas.getFullYear() + 1);
        d_christmas.setFullYear(d_christmas.getFullYear() + 1);
    }


    // d_now.setFullYear(2022);
    // d_now.setMonth(11);
    // d_now.setDate(31);
    // d_now.setHours(23);
    // d_now.setMinutes(59);
    // d_now.setSeconds(59);

    // d_now.setMonth(0);
    // d_now.setDate(1);
    // d_now.setHours(0);
    // d_now.setMinutes(0);
    // d_now.setSeconds(0);

    let miliseconds = (d_now.getTime() - d_zero.getTime()) % 1000;
    let seconds = d_now.getSeconds();
    let minutes = d_now.getMinutes() + seconds / 60;
    let hours = d_now.getHours() + minutes / 60;

    let week_day = d_now.getDay();
    if (week_day == 0) week_day = 7;
    let days = week_day - 1 + hours / 24;

    let days_month = d_now.getDate() - 1 + hours / 24;
    let days_year = -1 + hours / 24;

    if (ToggleSmoothBar.checked)
        seconds += miliseconds / 1000;

    document.getElementById("second-text").innerHTML = "Second: " + Number(miliseconds / 10).toFixed(2) + "%";
    document.getElementById("second-bar").style.width = miliseconds / 10 + "%";

    document.getElementById("minute-text").innerHTML = "Minute: " + Number(seconds * (100 / 60)).toFixed(2) + "%";
    document.getElementById("minute-bar").style.width = seconds * (100 / 60) + "%";

    document.getElementById("hour-text").innerHTML = "Hour: " + Number(minutes * (100 / 60)).toFixed(2) + "%";
    document.getElementById("hour-bar").style.width = minutes * (100 / 60) + "%";

    document.getElementById("day-text").innerHTML = "Day: " + Number(hours * (100 / 24)).toFixed(2) + "%";
    document.getElementById("day-bar").style.width = hours * (100 / 24) + "%";

    document.getElementById("week-text").innerHTML = "Week: " + Number(days * (100 / 7)).toFixed(2) + "%";
    document.getElementById("week-bar").style.width = days * (100 / 7) + "%";

    let month_lenght = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (d_now.getFullYear() % 4 == 0) month_lenght[1] = 29;
    document.getElementById("month-text").innerHTML = "Month: " + Number(days_month * (100 / (month_lenght[d_now.getMonth()]))).toFixed(2) + "%";
    document.getElementById("month-bar").style.width = days_month * (100 / (month_lenght[d_now.getMonth()])) + "%";

    for (let i = 0; i < d_now.getMonth(); i++)
        days_year += month_lenght[i];
    days_year += d_now.getDate();
    let year_lenght = 365;
    if (d_now.getFullYear() % 4 == 0) year_lenght = 366;
    document.getElementById("year-text").innerHTML = "Year: " + Number(days_year * (100 / (year_lenght))).toFixed(2) + "%";
    document.getElementById("year-bar").style.width = days_year * (100 / (year_lenght)) + "%";

    document.querySelector(".week_day").innerHTML = wL[d_now.getDay()];

    let hh = d_now.getHours();
    let mm = d_now.getMinutes();
    if (hh < 10)
        hh = "0" + hh;
    if (mm < 10)
        mm = "0" + mm;
    document.querySelector(".clock").innerHTML = hh + ":" + mm;
    document.querySelector(".date").innerHTML = d_now.getDate() + " " + mS[d_now.getMonth()] + " " + d_now.getFullYear();

    let one_year = d_christmas.getTime() - d_last_christmas.getTime();
    let time_from_last_chrismas = d_now.getTime() - d_last_christmas.getTime();
    let days_until_christmas = year_lenght - days_year - 7;
    if (days_until_christmas < 0) {
        days_until_christmas += year_lenght;
    }
    document.getElementById("christmas-text").innerHTML = "Christmas: " + Number(time_from_last_chrismas * (100 / one_year)).toFixed(2) + "%";
    document.getElementById("christmas-bar").style.width = time_from_last_chrismas * (100 / one_year) + "%";
    document.getElementById("christmas-text2").innerHTML = Number(days_until_christmas).toFixed(0) + " days until Christmas !";

    // setTimeout(f, SmoothBarCheck());
}, 1);