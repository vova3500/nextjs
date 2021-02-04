export const getCurrentAge = (date) =>{
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
}

export const calcDate = (age,dateOfBirth) =>{
    const newYear = new Date().getFullYear() - age
    const copyMonthAndDay = dateOfBirth.slice(5, 10)

    return `${newYear}-${copyMonthAndDay}`
}