document.body.style.backgroundImage = 'url("image/lead.webp")';
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "100% 800px";
function getWeather() {
    let city = document.getElementById("city").value.trim();

    // 1. Guard clause for empty input
    if (!city) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
        return;
    }

    // ⚠️ Replace 'YOUR_ACTUAL_API_KEY' with your real key from WeatherAPI.com
    const apiKey = "YOUR_ACTUAL_API_KEY"; 
            
    fetch(`https://api.weatherapi.com/v1/current.json?key=10a1351ee20342ea9e2163808261706&q=${city}`)
    .then(response => {
        // 2. Catch HTTP errors (like 400 Bad Request for bad city names)
        if (!response.ok) {
            throw new Error("City not found or API error");
        }
        return response.json();
    })
    .then(data => {
        const conditionText = data.current.condition.text.toLowerCase();
        // 3. Render the UI safely
        document.getElementById("result").innerHTML = `
            <h3>${data.location.name}, ${data.location.country}</h3>
            <img src="https:${data.current.condition.icon}" alt="Weather Icon">
            <p><b>Temperature:</b> ${data.current.temp_c} °C</p>
            <p><b>Condition:</b> ${data.current.condition.text}</p>
            <p><b>Humidity:</b> ${data.current.humidity}%</p>
            <p><b>Wind:</b> ${data.current.wind_kph} km/h</p>
        `;
        console.log(data);

        // const conditionText = data.current.condition.text.toLowerCase();
        if (conditionText.includes("rain")) {
            document.body.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("image/rain.webp")';
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "rgb(50, 249, 140)";
            document.body.style.backgroundSize = "100% 800px";
        }
        else if(conditionText.includes("cloudy")){
            document.body.style.backgroundImage = 'url("image/Cloudy.webp")';
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100% 800px";
        }
        else if(conditionText.includes("sunny")){
            document.body.style.backgroundImage = 'url("image/sunny.webp")';
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100% 800px";
        }
        else if(conditionText.includes("Overcast")){
            document.body.style.backgroundImage = 'url("image/Overcast.webp")';
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100% 800px";
        }
        else if(conditionText.includes("Thunderstorm")){
            document.body.style.backgroundImage = 'url("image/Thunderstorm.avif")';
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100% 800px";
        }
        else{
            document.body.style.backgroundImage = 'url("image/mist.jpg")';
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "100% 800px";
        }
    })
    .catch(error => {
        console.error("Fetch Error:", error);
        document.getElementById("result").innerHTML = `<p style='color:red;'>${error.message}</p>`;
    });
}
