// old code here

var ToggleSmoothBar = true;

// let no = 1;
// document.querySelector(".container-right").style.transform = `scale(${no})`;
document.querySelector(".background").style.backgroundSize = '5% 5%';

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
                document.querySelector(".container-clock-date").style.display = "block";
            }
            else {
                document.querySelector(".container-clock-date").style.display = "none";
            }
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

        if (properties.scaleimage) {
            document.querySelector(".background").style.backgroundSize = `${(properties.scaleimage.value * 100).toFixed(0)}%`;
        }

        if (properties.imagesize) {
            if (properties.imagesize.value == "contain") {
                document.querySelector(".background").style.backgroundSize = "contain";
            }
            if (properties.imagesize.value == "cover") {
                document.querySelector(".background").style.backgroundSize = "cover";
            }
        }
    },
};

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
    let minutes = d_now.getMinutes() + seconds / 60;
    let hours = d_now.getHours() + minutes / 60;

    let week_day = d_now.getDay();
    if (week_day == 0) week_day = 7;
    let days = week_day - 1 + hours / 24;

    let days_month = d_now.getDate() - 1 + hours / 24;
    let days_year = -1 + hours / 24;

    if (ToggleSmoothBar)
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
}, 1);