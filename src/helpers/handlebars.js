const Handlebars = require('handlebars')


// Định nghĩa helper formatDate
var formatDate = function(date) {
    let d = new Date(date)
    
    // Lấy ngày, tháng, năm
    let day = d.getDate()
    let month = d.getMonth() + 1
    let year = d.getFullYear()
    
    // Lấy giờ và phút
    let hours = d.getHours()
    let minutes = d.getMinutes()
  
    // Đảm bảo ngày, tháng, giờ và phút có hai chữ số
    day = day < 10 ? '0' + day : day
    month = month < 10 ? '0' + month : month
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
  
    // Trả về chuỗi định dạng dd/mm/yyyy hh:mm
    return `${hours}:${minutes} ${day}/${month}/${year}`
  }
// format price vnd ...
Handlebars.registerHelper('formatPrice', function(price) {
  return !price? 0 : price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
})
// format date
Handlebars.registerHelper('formatDate', formatDate)
// increment page
Handlebars.registerHelper('increment', function(value) {
  return value + 1
})
// decrement page
Handlebars.registerHelper('decrement', function(value) {
  return value - 1
})
// check lenght of list for Previos
Handlebars.registerHelper('gt', function(a, b) {
  return a > b
})
// check lenght of list for Next
Handlebars.registerHelper('lt', function(a, b) {
  return a < b
})
// pagination page for view index
Handlebars.registerHelper('pagination', function(currentPage, totalPages, options) {
  let out = ''
  for (let i = 1; i <= totalPages; i++) {
    out += options.fn({
        number: i,
        active: (i === currentPage)
    })
  }
  return out
})
// Định nghĩa helper eqSelect
Handlebars.registerHelper('eqSelect', function(a, b) {
    return a === b? true: false
})

module.exports = Handlebars