const background = document.querySelector(".background");
const root = document.querySelector(":root");
var ToggleSmoothBar = true;
var PaddingValue = 63;
var PaddingPosition = "none";
var ClockFormat = "12";
var LastBackgroundBlendMode = "overlay";
var LastBackgroundSize = "cover";
var LastBackgroundPosition = "center center";
var PropertiesButtonPressed = false;

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.secondsbar) {
            if (properties.secondsbar.value) {
                document.querySelector(".second").style.display = "block";
            }
            else {
                document.querySelector(".second").style.display = "none";
            }
        }

        if (properties.smoothbar) {
            ToggleSmoothBar = properties.smoothbar.value;
        }

        if (properties.bars) {
            if (properties.bars.value) {
                document.querySelector(".container-bars").style.display = "block";
            }
            else {
                document.querySelector(".container-bars").style.display = "none";
            }
        }

        if (properties.clockdate) {
            if (properties.clockdate.value) {
                document.querySelector(".container-clock-date").style.display = "inline-block";
            }
            else {
                document.querySelector(".container-clock-date").style.display = "none";
            }
        }

        if (properties.clockformat) {
            ClockFormat = properties.clockformat.value;
        }

        if (properties.christmasbar) {
            if (properties.christmasbar.value) {
                document.querySelector(".container-christmas").style.display = "block";
            }
            else {
                document.querySelector(".container-christmas").style.display = "none";
            }
        }

        if (properties.scale) {
            document.querySelector(".container-left").style.transform = `scale(${properties.scale.value})`;
            document.querySelector(".container-right").style.transform = `scale(${properties.scale.value})`;
        }

        if (properties.changeimage) {
            if (properties.changeimage.value == "none") {
                background.style.backgroundImage = "url()" 
            }
            if (properties.changeimage.value == "pixelart") {
                background.style.backgroundImage = "url(bg/PixelArt.jpg)";
                if (!PropertiesButtonPressed) {
                    background.style.backgroundBlendMode = "normal";
                    background.style.backgroundSize = "cover";
                    background.style.backgroundPosition = "center center";
                }
            }
            if (properties.changeimage.value == "landscape") {
                background.style.backgroundImage = "url(bg/Landscape.jpg)";
                if (!PropertiesButtonPressed) {
                    background.style.backgroundBlendMode = "overlay";
                    background.style.backgroundSize = "cover";
                    background.style.backgroundPosition = "center center";
                }
            }
            if (properties.changeimage.value == "animegirl") {
                background.style.backgroundImage = "url(bg/AnimeGirl.jpg)";
                if (!PropertiesButtonPressed) {
                    background.style.backgroundBlendMode = "normal";
                    background.style.backgroundSize = "cover";
                    background.style.backgroundPosition = "center center";
                }
            }if (properties.changeimage.value == "sakura") {
                background.style.backgroundImage = "url(bg/Sakura.jpg)";
                if (!PropertiesButtonPressed) {
                    background.style.backgroundBlendMode = "normal";
                    background.style.backgroundSize = "cover";
                    background.style.backgroundPosition = "center center";
                }
            }
            if (properties.changeimage.value == "manga") {
                background.style.backgroundImage = "url(bg/Power.png)";
                if (!PropertiesButtonPressed) {
                    background.style.backgroundBlendMode = "overlay";
                    background.style.backgroundSize = "contain";
                    background.style.backgroundPosition = "bottom right";
                }
            }
            if (properties.changeimage.value == "custom") {
                if (!PropertiesButtonPressed) {
                    background.style.backgroundBlendMode = "overlay";
                    background.style.backgroundSize = "cover";
                    background.style.backgroundPosition = "center center";
                }
            }
        }

        if (properties.imageproperties) {
            PropertiesButtonPressed = properties.imageproperties.value;
            background.style.backgroundBlendMode = LastBackgroundBlendMode;
            background.style.backgroundSize = LastBackgroundSize;
            background.style.backgroundPosition = LastBackgroundPosition;
        }

        if (properties.customimage) {
            background.style.backgroundImage = `url(${'file:///' + properties.customimage.value})`;
        }

        if (properties.imageblendmode) {
            background.style.backgroundBlendMode = properties.imageblendmode.value;
            LastBackgroundBlendMode = properties.imageblendmode.value;
        }

        if (properties.scaleimage) {
            background.style.backgroundSize = `${(properties.scaleimage.value * 100).toFixed(0)}%`;
            LastBackgroundSize = `${(properties.scaleimage.value * 100).toFixed(0)}%`;
        }

        if (properties.imagesize) {
            if (properties.imagesize.value != "custom") {
                background.style.backgroundSize = properties.imagesize.value;
                LastBackgroundSize = properties.imagesize.value;
            }
        }

        if (properties.imageposition) {
            background.style.backgroundPosition = properties.imageposition.value;
            LastBackgroundPosition = properties.imageposition.value;
        }

        if (properties.extrapaddingfortaskbar) {

            PaddingPosition = properties.extrapaddingfortaskbar.value;

            if (properties.extrapaddingfortaskbar.value == "none")
                background.style.padding = "0 0 0 0";

            if (properties.extrapaddingfortaskbar.value == "top")
                background.style.padding = `${PaddingValue}px 0 0 0`;

            if (properties.extrapaddingfortaskbar.value == "right")
                background.style.padding = `0 ${PaddingValue}px 0 0`;

            if (properties.extrapaddingfortaskbar.value == "bottom")
                background.style.padding = `0 0 ${PaddingValue}px 0`;

            if (properties.extrapaddingfortaskbar.value == "left")
                background.style.padding = `0 0 0 ${PaddingValue}px`;
        }

        if (properties.paddingvalue) {

            PaddingValue = properties.paddingvalue.value;

            if (PaddingPosition == "none")
                background.style.padding = "0 0 0 0";

            if (PaddingPosition == "top")
                background.style.padding = `${PaddingValue}px 0 0 0`;

            if (PaddingPosition == "right")
                background.style.padding = `0 ${PaddingValue}px 0 0`;

            if (PaddingPosition == "bottom")
                background.style.padding = `0 0 ${PaddingValue}px 0`;

            if (PaddingPosition == "left")
                background.style.padding = `0 0 0 ${PaddingValue}px`;

        }

        if (properties.color) {
                root.style.setProperty('--background-color', "var(--" + properties.color.value + "_DARK)");
                root.style.setProperty('--accent-color', "var(--" + properties.color.value + "_LIGHT)");
                root.style.setProperty('--bright-color', "var(--" + properties.color.value + "_BRIGHT)");
        }

        if (properties.background) {
            // Convert the custom color to 0 - 255 range for CSS usage
            var backgroundColor = properties.background.value.split(' ');
            backgroundColor = backgroundColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            root.style.setProperty('--custom_DARK', backgroundColor);
            root.style.setProperty('--background-color', backgroundColor);
        }

        if (properties.accent) {
            // Convert the custom color to 0 - 255 range for CSS usage
            var accentColor = properties.accent.value.split(' ');
            accentColor = accentColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            root.style.setProperty('--custom_LIGHT', accentColor);
            root.style.setProperty('--accent-color', accentColor);
        }

        if (properties.elements) {
            // Convert the custom color to 0 - 255 range for CSS usage
            var elementsColor = properties.elements.value.split(' ');
            elementsColor = elementsColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            root.style.setProperty('--custom_BRIGHT', elementsColor);
            root.style.setProperty('--bright-color', elementsColor);
        }
    },
};

function f_ClockFormat(date) {
    let hh = date.getHours();
    let mm = date.getMinutes();

    let format = '';
    if (ClockFormat == "12") {
        format = hh >= 12 ? 'PM' : 'AM';
        hh = hh % 12;
    }
    
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;

    let strTime = hh + ':' + mm + ' ' + format;
    return strTime;
  }

let wL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

setInterval(function () {
    const d_now = new Date();
    const d_zero = new Date(d_now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const d_christmas = new Date(d_now.getFullYear(), 11, 25, 0, 0, 0, 0);
    const d_last_christmas = new Date(d_now.getFullYear() - 1, 11, 25, 0, 0, 0, 0);

    let t = d_now.getTime() / 100 - d_christmas.getTime() / 100;
    if (t > 0) {
        d_last_christmas.setFullYear(d_last_christmas.getFullYear() + 1);
        d_christmas.setFullYear(d_christmas.getFullYear() + 1);
    }

    let miliseconds = (d_now.getTime() - d_zero.getTime()) % 1000;
    let seconds = d_now.getSeconds();

    if (ToggleSmoothBar)
        seconds += miliseconds / 1000;

    let minutes = d_now.getMinutes() + seconds / 60;
    let hours = d_now.getHours() + minutes / 60;

    let week_day = d_now.getDay();
    if (week_day == 0) week_day = 7;
    let days = week_day - 1 + hours / 24;

    let days_month = d_now.getDate() - 1 + hours / 24;
    let days_year = -1 + hours / 24;

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
    
    document.querySelector(".clock").innerHTML = f_ClockFormat(d_now);
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
}, 1);