const moment = require('moment-timezone')

async function getTimeData(city) {
    // Get the current time for the requested city
    const timezone = moment.tz.guess()
    const time = moment().tz(timezone).format('h:mm A')
  
    // Log the retrieved time data
    console.log(`Time data retrieved: Time: ${time}`)
  
    // Format the time data as a string message
    const messageText = `The current time in ${city} is ${time}.`
  
    // Log the time data message sent to the user
    console.log(`Time data message sent to user: ${messageText}`)
  
    // Return the time data message
    return messageText
  }

module.exports = {
  getTimeData,
}
