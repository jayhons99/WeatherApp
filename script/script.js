/* Retrieves location when page loads */
window.addEventListener("load", ()=> {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
            /* API retrieved from https://openweathermap.org */ 
            const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=de881718d16b4ed2ac9774f9d99c81ff`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                });
        });
    } else {
        h1.textContent = "Unable to find location, please try again. Browser"
        + "may not be supported";
    }
});