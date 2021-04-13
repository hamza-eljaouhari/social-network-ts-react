const formatMySQLDate = (MySQLDateString : string) : string => {
    const date = new Date(MySQLDateString);

    const day = date.getDay().toString().length === 1 ? "0" + date.getDay() : date.getDay();
    const month = date.getMonth().toString().length === 1 ? "0" + date.getMonth() : date.getMonth();
    
    return day + '/' + month + '/' + date.getFullYear();
}

export default formatMySQLDate;