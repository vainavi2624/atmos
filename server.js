import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/weather', (req, res) => {
//   res.render('weather');
// });

app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).send('Latitude and longitude parameters are required');
    }
    const apiKey = '7c26f7b83075805f2538bb9c9144e5e6';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=12`;
  
    try {
      const [currentWeatherResponse, hourlyForecastResponse] = await Promise.all([
        axios.get(currentWeatherUrl),
        axios.get(hourlyForecastUrl)
      ]);
  
      const currentWeatherData = currentWeatherResponse.data;
      const hourlyForecastData = hourlyForecastResponse.data;
  
      const formattedData = {
        name: currentWeatherData.weather[0].main,
        weather: {
          description: currentWeatherData.weather[0].description,
          icon: currentWeatherData.weather[0].icon,
        },
        main: {
          temp: currentWeatherData.main.temp,
          humidity: currentWeatherData.main.humidity,
          temp_min: currentWeatherData.main.temp_min,
          temp_max: currentWeatherData.main.temp_max,
        },
        hourly: hourlyForecastData.list.map(hour => ({
          dt: hour.dt,
          temp: hour.main.temp,
          weather: {
            description: hour.weather[0].description,
            icon: hour.weather[0].icon,
          }
        }))
      };
  
      res.json(formattedData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).send('Error fetching weather data');
    }
  });
  
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
