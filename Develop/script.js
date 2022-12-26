var day = moment().format('dddd')
var month = moment().format("MMMM Do")
document.getElementById('currentDay').textContent = `${day}, ${month}`
