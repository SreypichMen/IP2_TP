"use strict";
exports.__esModule = true;
exports.KhmerDateTest = void 0;
var KhmerDateTest = /** @class */ (function() {
    function KhmerDateTest() {
        this.inputData = function(date) {
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var now = new Date();
            var inputDate = new Date(date);
            console.log(weeks[now.getDay()] + " " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear());
            console.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds());
            // data input form user
            console.log("\n\nDate input: " + date);
            console.log(weeks[inputDate.getDay()] + " " + inputDate.getDate() + " " +
                months[inputDate.getMonth()] + " " + inputDate.getFullYear());
            console.log(inputDate.getHours() + ":" + inputDate.getMinutes() + ":" + inputDate.getSeconds() + ":" + inputDate.getMilliseconds());
            var value;
            var daysMonth = 30;
            var monthsYear = 12;
            var text;
            value = now.getTime() - inputDate.getTime();
            value = value / (1000 * 60 * 60 * 24);
            console.log();
            // months
            if (Math.floor(value / daysMonth / monthsYear) > 0) {
                // console.log(Math.floor(value / daysMonth / monthsYear) + " years ago");
                text = Math.floor(value / daysMonth / monthsYear) + " years ago";
            } else if (Math.floor(value / daysMonth) > 0) {
                //   console.log(Math.floor(value / daysMonth) + " months ago");
                text = Math.floor(value / daysMonth) + " months ago";
            }
            // days
            else if (Math.floor(value) > 0) {
                text = Math.floor(value) + " days ago";
                // console.log(text);
            } else if (Math.floor(value * 24) * 24 > 0) {
                text = Math.floor(value * 24) + " hours ago";
                //console.log(text);
            } else if (Math.floor(value * 24 * 60) > 0) {
                text = Math.floor(value * 24 * 60) + " minutes ago";
                //  console.log(text);
            } else if (Math.floor(value * 24 * 60 * 60) > 0) {
                text = Math.floor(value * 24 * 60 * 60) + " seconds ago";
                // console.log(text); 
            } else {
                text = "Just a moment ago";
                //console.log(text);
            }
            return text;
        };
    }
    KhmerDateTest.prototype.getData = function() {
        return "12:00";
    };
    return KhmerDateTest;
}());
exports.KhmerDateTest = KhmerDateTest;