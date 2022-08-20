exports.getWeekOfTheYear = (date) => {
    let currentdate = new Date();
    const newDate = new Date(date)
    const currentYear = currentdate.getFullYear()
    let oneJan = new Date(currentYear, 0, 1);
    let dayOfYear = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    console.log(dayOfYear)
    let weekOfYear = Math.ceil((currentdate.getDay() + 1 + dayOfYear) / 7);

    return {
        weekOfYear,
        dayOfYear,
        currentYear
    }
}