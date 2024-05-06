// to set date while clicking on date picker etc, this function add one day and make response correct and argument will be = 2023-10-21T20:00:00.000Z this format
export function formatDate(date) {
    if (!date.value) return;
    const dateInput = new Date(date.value);
    dateInput.setDate(dateInput.getDate());

    const year = dateInput.getFullYear();
    const month = (dateInput.getMonth() + 1).toString().padStart(2, "0");
    const day = dateInput.getDate().toString().padStart(2, "0");
    const finalDate = `${year}-${month}-${day}T${dateInput.toISOString().split("T")[1]
        }`;
    return finalDate;
}
// this function return the duration when you provide the time in AM or PM
export function setCalculatedDuration(start, end) {
    if (!start) {
        return "";
    } else if (!end) {
        return "";
    } else {
        const startTime = convertTimeTo24Hour(start);
        const endTime = convertTimeTo24Hour(end);

        let duration = endTime - startTime;
        if (duration < 0) {
            duration = 24 + duration;
        }
        if (duration < 10) {
            return `0${duration.toString()}`;
        } else {
            duration.toString();
        }
    }
}
// This function return the the date in 24 hour format
export function convertTimeTo24Hour(time) {
    if (!time) return;
    const [timeString, modifier] = time.split(" ");
    let [hours, minutes] = timeString.split(":");

    if (hours === "12") {
        hours = "00";
    }

    if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
    }

    return parseInt(hours, 10) + parseInt(minutes, 10) / 60;
}
// This function simply add + 1 in day and take arguments in form of 2023-10-20
export function addOneMoreDay(date) {
    if (!date) return;
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const day = dateObject.getDate();
    const lastDay = new Date(year, month + 1, 0).getDate();

    if (day === 1) {
        if (month === 11) {
            return `${year + 1}-01-01`;
        } else {
            const nextMonth = month < 9 ? "0" + (month + 2) : month + 1;
            return `${year}-${nextMonth}-01`;
        }
    } else if (day === lastDay) {
        if (month === 11) {
            return `${year + 1}-01-01`;
        } else {
            const nextMonth = month < 9 ? "0" + (month + 2) : month + 1;
            return `${year}-${nextMonth}-01`;
        }
    } else {
        const nextDay = day < 9 ? "0" + (day + 1) : day + 1;
        const nextMonth = month < 9 ? "0" + (month + 1) : month + 1;
        return `${year}-${nextMonth}-${nextDay}`;
    }
}

// export function getCustomers(params) {
//     const { bookingPage, bookingLimit, bookingSortBy } = params;
//     console.log(params, 'params');
//         fetch(
//         `/client/bookings/list/filter/search?page=${bookingPage}&limit=${bookingLimit}&sortBy=${bookingSortBy}`
//     ).then((res) => console.log(res, 'res res res'));
// }
