exports.getWeekOfTheYear = () => {
    let currentdate = new Date();
    const currentYear = currentdate.getFullYear()
    let oneJan = new Date(currentYear, 0, 1);
    let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    let weekOfYear = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

    return {
        weekOfYear,
        currentYear
    }
}