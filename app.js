window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDesciption = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/c188b52dcd209b65aac2bb2316eb4401/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //set dom elements from the api
                temperatureDegree.textContent = temperature;
                temperatureDesciption.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //set icon
                setIcons(icon, document.querySelector(".icon"));

                //change temperature to celcius/farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                    } else {
                        temperatureSpan.textContent = "F";
                    }
                });

            });
        });

        
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        //looks for every line, and replaces with an underscore & to uppercase
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})