const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

// Fetch weather data from API
const fetchWeather = async (city) => {

  //make request to own api, which will forward the request to public api
  //removed api key
  const url = `/api?query=${city}`

  const res = await fetch(url)
  const data = await res.json()
  console.log(data)

 /* if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert('Invalid API Key')
    return
  }*/

  const displayData = {
    city: data.location.name,
    temp: celsiusToFahrenheit(data.current.temperature),
  }

  console.log(displayData)

  addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F</h2>
  `
  cityInput.value = ''
}

// Convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (temp) => {
  return Math.ceil((temp * 9/5) + 32 )
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (cityInput.value === '') {
    alert('Please enter a city')
  } else {
    fetchWeather(cityInput.value)
  }
})

// Initial fetch
fetchWeather('Miami')