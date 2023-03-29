const weatherBox = document.getElementById("weather-box")
const cityNameInput = document.getElementById("city-name-input")
const searchButton = document.getElementById("search-button")


searchButton.addEventListener("click", event => {
    let cityName = cityNameInput.value
    cityNameInput.value =""

    let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)

    receivedPromise.then(response => {
        return response.json()
    }).then(json => {
        fillWeatherBox(json, cityName)
    })    
})

const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = ""
    
    let label = document.createElement("h3")
    label.textContent = cityName
    weatherBox.append(label)

    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement("li")
    area.className = `weather-box-item`
    area.innerHTML = `<strong>Area:</strong> ${areaName}`
    weatherBox.append(area)
    
    let regionName = json.nearest_area[0].region[0].value
    let region = document.createElement("li")
    region.className = `weather-box-item`
    region.innerHTML = `<strong>Region:</strong> ${regionName}`
    weatherBox.append(region)

    let countryName = json.nearest_area[0].country[0].value
    let country = document.createElement("li")
    country.className = `weather-box-item`
    country.innerHTML = `<strong>Country:</strong> ${countryName}`
    weatherBox.append(country)

    let temperatureValue = json.current_condition[0].FeelsLikeF
    let temperature = document.createElement("li")
    temperature.className = `weather-box-item`
    temperature.innerHTML = `<strong>Currently:</strong> Feels like ${temperatureValue}°F`
    weatherBox.append(temperature)
    
    let previousList = document.querySelector(".previous-searches-list")
    console.log(previousList)

    const listItem = document.getElementById("previous-searches")
    console.log(listItem)
    listItem.remove()

if (!previousList.innerHTML.includes(json.nearest_area[0].areaName[0].value)) {
    previousList.innerHTML += `<a href="#">${cityName}</a>-${temperatureValue}`
}

    // let previous = document.createElement("ul")
    // console.log(previous)

    // if(listItem.textContent === "No previous searches.") {
    //     listItem.remove()
    //     listItem.innerHTML = `<a href="#">${areaName}</a>-${temperatureValue}`
    //     weatherBox.append(listItem)
    // } else {
    //     listItem.innerHTML = `<a href="#">${cityName}</a>-${temperatureValue}`
    // }
    // weatherBox.append(listItem)
}