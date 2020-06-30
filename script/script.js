/* Retrieves location when page loads */
window.addEventListener("load", ()=> {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
        })
    } else {
        h1.textContent = "Unable to find location, please try again. Browser"
        + "may not be supported";
    }
});