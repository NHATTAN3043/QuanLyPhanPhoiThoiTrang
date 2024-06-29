const Handlebars = require('handlebars');


// Định nghĩa helper formatDate
var formatDate = function(date) {
    let d = new Date(date);
    
    // Lấy ngày, tháng, năm
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    
    // Lấy giờ và phút
    let hours = d.getHours();
    let minutes = d.getMinutes();
  
    // Đảm bảo ngày, tháng, giờ và phút có hai chữ số
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Trả về chuỗi định dạng dd/mm/yyyy hh:mm
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };
Handlebars.registerHelper('formatDate', formatDate)
// Định nghĩa helper eqSelect
Handlebars.registerHelper('eqSelect', function(a, b) {
    return a === b;
});

module.exports = Handlebars;