function stringFromDate(date) {
    return `${date.getYear() + 1900}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${ date.getDate().toString().padStart(2, '0') }`;
}

function addDaysToDate(date, days) {
    return new Date(date.getTime() + days * (86400000));
}

function arrayToList(array)
{
    if (array.length <= 0)
       return null;

    return {value: array[0], rest: arrayToList(array.slice(1))};
}

export { stringFromDate as dateFromDate, addDaysToDate, arrayToList };