document.addEventListener('DOMContentLoaded', function() {
    const weatherInfo = document.getElementById('weather-info');
    const hourlyForecastChartElement = document.getElementById('hourly-forecast-chart');

    const weatherTips = {
        clear: "It's a clear day! Perfect for outdoor activities. ☀️",
        rain: "Don't forget your umbrella! It's raining outside. ☔",
        snow: "Stay warm! It's snowing outside. ❄️",
        clouds: "It's a bit cloudy today. A great day for a walk! ☁️",
        default: "Have a great day! 😃"
    };

    async function fetchWeatherData(latitude, longitude) {
        if (!latitude || !longitude) {
            console.error('Latitude or longitude parameter is missing or undefined');
            return;
        }
        console.log('Fetching weather data for', latitude, longitude);

        try {
            const response = await axios.get(`/api/weather?lat=${latitude}&lon=${longitude}`);
            console.log('Response:', response.data);
            const { name, weather, main, hourly } = response.data;

            renderWeatherInfo({ name, weather, main });
            renderHourlyForecast(hourly);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            if (weatherInfo) {
                weatherInfo.textContent = 'Error fetching weather data. Please try again later.';
            }
        }
    }

    function renderWeatherInfo(data) {
        const { name, weather, main } = data;
        const { description, icon } = weather;
        const { temp, humidity, temp_min, temp_max } = main;

        let weatherIcon = 'fas fa-sun'; // Default to sunny icon
        let weatherTip = weatherTips.default;

        switch (icon) {
            case '01d':
                weatherIcon = 'fas fa-sun';
                weatherTip = weatherTips.clear;
                break;
            case '01n':
                weatherIcon = 'fas fa-moon';
                weatherTip = weatherTips.clear;
                break;
            case '02d':
            case '02n':
                weatherIcon = 'fas fa-cloud-sun';
                weatherTip = weatherTips.clouds;
                break;
            case '03d':
            case '03n':
                weatherIcon = 'fas fa-cloud';
                weatherTip = weatherTips.clouds;
                break;
            case '04d':
            case '04n':
                weatherIcon = 'fas fa-cloud-meatball';
                weatherTip = weatherTips.clouds;
                break;
            case '09d':
            case '09n':
                weatherIcon = 'fas fa-cloud-showers-heavy';
                weatherTip = weatherTips.rain;
                break;
            case '10d':
            case '10n':
                weatherIcon = 'fas fa-cloud-sun-rain';
                weatherTip = weatherTips.rain;
                break;
            case '11d':
            case '11n':
                weatherIcon = 'fas fa-bolt';
                weatherTip = weatherTips.default;
                break;
            case '13d':
            case '13n':
                weatherIcon = 'fas fa-snowflake';
                weatherTip = weatherTips.snow;
                break;
            case '50d':
            case '50n':
                weatherIcon = 'fas fa-smog';
                weatherTip = weatherTips.default;
                break;
            default:
                weatherIcon = 'fas fa-sun';
                weatherTip = weatherTips.default;
        }

        const weatherHTML = `
            <h2>${name}</h2>
            <i class="${weatherIcon} fa-4x weather-icon"></i>
            <p>${description}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Min Temperature: ${temp_min}°C</p>
            <p>Max Temperature: ${temp_max}°C</p>
        `;

        if (weatherInfo) {
            weatherInfo.innerHTML = weatherHTML;
            showThinkingCloud(weatherTip);
        }
    }

    function renderHourlyForecast(hourlyData) {
        const labels = hourlyData.map(hour => new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        }));
        const temperatures = hourlyData.map(hour => hour.temp);

        const hourlyForecastChartElement = document.getElementById('hourly-forecast-chart');
        if (!hourlyForecastChartElement) {
            console.error('Hourly forecast chart element not found');
            return;
        }

        const ctx = hourlyForecastChartElement.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context for hourly forecast chart');
            return;
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatures,
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function showThinkingCloud(tip) {
        const cloud = document.createElement('div');
        cloud.classList.add('thinking-cloud');
        cloud.innerHTML = `
            <span class="close-icon">&times;</span>
            <p>${tip}</p>
        `;
        document.body.appendChild(cloud);

        const closeIcon = cloud.querySelector('.close-icon');
        closeIcon.addEventListener('click', () => {
            cloud.remove();
        });
    }

    // Initialize the Mapbox Geocoder
    mapboxgl.accessToken = 'pk.eyJ1IjoidmFpbnUxMjM0IiwiYSI6ImNseTA1OXVzazBkYm8yanF2Y213ZW5jZ28ifQ.sbwOGsh-u1QGt31jEAxJrw';
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'place,postcode,locality'
    });
    geocoder.addTo('#geocoder');

    let selectedResult = null;

    geocoder.on('result', (e) => {
        const { result } = e;
        if (result && result.center) {
            selectedResult = result;
            const [longitude, latitude] = result.center;
            fetchWeatherData(latitude, longitude);
        } else {
            console.error('Invalid geocoder result:', result);
        }
    });

    document.getElementById('get-weather').addEventListener('click', () => {
        if (selectedResult && selectedResult.center) {
            const [longitude, latitude] = selectedResult.center;
            fetchWeatherData(latitude, longitude);
        } else {
            alert('Please select a location using the geocoder.');
        }
    });

    // Check and log if Chart.js is loaded
    if (window.Chart) {
        console.log('Chart.js loaded successfully');
    } else {
        console.error('Chart.js not loaded');
    }
});
