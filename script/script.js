/* Retrieves location when page loads */
window.addEventListener("load", ()=> {
    let long;
    let lat;
    let desc = document.querySelector(".temperature-description");
    let cityName = document.querySelector(".location-city");
    let degree = document.querySelector(".temperature-degree");
    let icon = document.querySelector(".icon");
    let tempSection = document.querySelector(".temperature");
    const tempSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
            /* API retrieved from https://openweathermap.org */ 
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=de881718d16b4ed2ac9774f9d99c81ff`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    /* Retrieves temperature, timezone, and description of weather in area. Add in more features later. */
                    const {temp} = data.main; 
                    const city = data.name;
                    const icon = data.weather[0].icon;
                    const description = data.weather[0].description;
                    const kelvinToF = ((9/5) * (temp - 273) + 32).toFixed(0);  // Default to Fahrenheit
                    /* Change between Fahrenheit and Celsius */
                    tempSection.addEventListener("click", () => {
                        if (tempSpan.textContent === "F") {
                            let celsius = (kelvinToF - 32) / (9/5).toFixed(0);
                            degree.textContent = celsius; 
                            tempSpan.textContent = 'C';
                        } else {
                            degree.textContent = kelvinToF;
                            tempSpan.textContent = 'F';
                        }
                    })
                    /* Set DOM elements to retrieved data. */
                    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
                    document.getElementById("icon").src = iconURL;
                    degree.textContent = kelvinToF;
                    cityName.textContent = city; 
                    desc.textContent = capitalize(description);
                });
        });
    } else {
        h1.textContent = "Unable to find location, please try again. Browser"
        + "may not be supported";
    }
});

/* Function that capitalizes first character in string when appropriate. */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}