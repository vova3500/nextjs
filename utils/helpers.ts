export const getCurrentAge = (date: string) =>{
    const newDate: any = new Date(date)
    return ((new Date().getTime() - newDate) / (24 * 3600 * 365.25 * 1000)) | 0;
}


export const calcDate = (age: number,dateOfBirth: string) =>{
    const newYear = new Date().getFullYear() - age
    const copyMonthAndDay = dateOfBirth.slice(5, 10)

    return `${newYear}-${copyMonthAndDay}`
}