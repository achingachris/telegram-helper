const storage = {}

function getUserData(chatId) {
  let userData = storage[chatId]
  if (!userData) {
    userData = {
      waitingForCity: false,
      waitingForWeather: false,
      waitingForTime: false,
    }
    storage[chatId] = userData
  }
  return userData
}

function resetUserData(chatId) {
  const userData = getUserData(chatId)
  userData.waitingForCity = false
  userData.waitingForWeather = false
  userData.waitingForTime = false
}

module.exports = {
  getUserData,
  resetUserData,
}
