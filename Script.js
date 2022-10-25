const d = new Date();
const d_zero = new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);

// d_zero.setTime(0);
// d_zero.setFullYear(d.getFullYear());
// document.getElementsByClassName("month-text")[0].innerHTML = d_zero + " ------------------------- " + d;

// let mata = 1;

setInterval(function(){ 
    const d_now = new Date(); 
    // const d_now = new Date(d.getFullYear(), 0, 0, 0, 0, 0, 0);
    
    // if (mata == 1) {
    //     d_now.setDate(2);
    //     d_now.setHours(23);
    //     d_now.setMinutes(59);
    //     d_now.setSeconds(59);
    //     mata = 11;
    // }

    // d_now.setDate(31);
    // d_now.setHours(23);
    // d_now.setMinutes(59);
    // d_now.setSeconds(59);

    // document.getElementsByClassName("test")[0].innerHTML = month_lenght[d_now.getMonth()];

    let miliseconds = (d_now.getTime() - d_zero.getTime()) % 1000;
    let seconds = d_now.getSeconds() + miliseconds/1000;
    let minutes = d_now.getMinutes() + seconds/60;
    let hours = d_now.getHours() + minutes/60;
    
    let week_day = d_now.getDay();
    if (week_day == 0) week_day = 7;
    let days = week_day - 1 + hours/24;

    let days_month = d_now.getDate() - 1 + hours/24;
    let days_year = -1 + hours/24;

    document.getElementsByClassName("second-text")[0].innerHTML = "Second: " + Number(miliseconds/10).toFixed(2) + "%";
    document.getElementsByClassName("second-bar")[0].style.width = miliseconds/10 + "%";

    document.getElementsByClassName("minute-text")[0].innerHTML = "Minute: " + Number(seconds*(100/60)).toFixed(2) + "%";
    document.getElementsByClassName("minute-bar")[0].style.width = seconds*(100/60) + "%";

    document.getElementsByClassName("hour-text")[0].innerHTML = "Hour: " + Number(minutes*(100/60)).toFixed(2) + "%";
    document.getElementsByClassName("hour-bar")[0].style.width = minutes*(100/60) + "%";

    document.getElementsByClassName("day-text")[0].innerHTML = "Day: " + Number(hours*(100/24)).toFixed(2) + "%";
    document.getElementsByClassName("day-bar")[0].style.width = hours*(100/24) + "%";

    document.getElementsByClassName("week-text")[0].innerHTML = "Week: " + Number(days*(100/7)).toFixed(2) + "%";
    document.getElementsByClassName("week-bar")[0].style.width = days*(100/7) + "%";

    let month_lenght = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (d_now.getFullYear()%4 == 0) month_lenght[1] = 29;
    document.getElementsByClassName("month-text")[0].innerHTML = "Month: " + Number(days_month*(100/(month_lenght[d_now.getMonth()]-1))).toFixed(2) + "%";
    document.getElementsByClassName("month-bar")[0].style.width = days_month*(100/(month_lenght[d_now.getMonth()]-1)) + "%";

    for(let i=0; i<d_now.getMonth(); i++) {
        days_year += month_lenght[i];
    }
    days_year += d_now.getDate();
    let year_lenght = 365;
    if (d_now.getFullYear()%4 == 0) year_lenght = 366;
    document.getElementsByClassName("year-text")[0].innerHTML = "Year: " + Number(days_year*(100/(year_lenght-1))).toFixed(2) + "%";
    document.getElementsByClassName("year-bar")[0].style.width = days_year*(100/(year_lenght-1)) + "%";

    document.getElementsByClassName("test")[0].innerHTML = d_now;
}, 1);