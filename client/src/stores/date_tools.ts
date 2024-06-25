var dateTools = {
    stringToMillis: function(str: string): number {
        // str - string date in 'YYYY-MM-DD' format
        var date = new Date();
        var date_arr = str.split("-");
        date.setFullYear(parseInt(date_arr[0]));
        date.setMonth(parseInt(date_arr[1]) - 1);
        date.setDate(parseInt(date_arr[2]));

        return date.valueOf();
    },
    millisToString: function(millis: any): string {
        // this function returns string date in 'YYYY-MM-DD' format
        var date = new Date(millis);
        var month = (date.getMonth() + 1);
        var day = date.getDate();
        var str = "" + date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);

        return str;
    }
}
export default dateTools