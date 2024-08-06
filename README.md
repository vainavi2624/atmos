# Atmos
Weather App

### Introduction
In this project, I developed a weather application using a combination of EJS templates for server-side rendering, CSS for styling, and JavaScript for functionality. The application provides real-time weather information based on user input, leveraging external APIs for weather data and Mapbox for location services.

### Architecture
The application is structured with the following key components:
- **Server-Side**: Implemented using Node.js and Express. The server handles API requests, processes data, and serves EJS templates to the client.
- **Client-Side**: Utilizes EJS for templating, CSS for styling, and JavaScript for interactivity.
- **External Libraries**:
  - **Mapbox**: For geocoding and map interactions.
  - **Axios**: For making HTTP requests to fetch weather data.
  - **Chart.js**: For visualizing hourly weather forecasts.

### Functionalities
1. **Weather Information**:
   - Fetches and displays current weather conditions including temperature, humidity, and weather descriptions.
   - Updates the UI with weather icons and descriptions based on the fetched data.
   
2. **Hourly Forecast**:
   - Visualizes hourly temperature data using a line chart.
   - Provides a graphical representation of temperature changes throughout the day.
   
3. **Geocoding and Location Search**:
   - Uses Mapbox Geocoder to allow users to search for locations and fetch corresponding weather data.
   - Handles location input and updates the weather information based on user-selected locations.

4. **User Interface**:
   - A responsive design that adjusts to various screen sizes.
   - Includes animations and visual effects to enhance user experience.

### Implementation
1. **Header and Footer (EJS)**:
   - Included reusable header and footer components in `header.ejs` and `footer.ejs`.
   - Header includes styles and scripts necessary for the functionality of the application.
   
2. **Main Page (index.ejs)**:
   - Renders the main layout with a search bar for location input, a container for weather information, and a canvas for the hourly forecast chart.

3. **Styling (style.css)**:
   - Applied a dark theme with flexible layouts to ensure readability and aesthetics.
   - Implemented animations for interactive elements like weather icons.
   - Used CSS Grid and Flexbox for responsive design and alignment.

4. **JavaScript Functionality (script.js)**:
   - Implemented functions to fetch weather data, render weather information, and update the hourly forecast chart.
   - Added a `thinking-cloud` component to display contextual tips based on weather conditions.
   - Integrated Mapbox for location search and geocoding functionality.

### Challenges
1. **Integration of External APIs**:
   - Coordinating between Mapbox for location services and a weather API required careful handling of asynchronous requests and ensuring data consistency.
   
2. **Handling User Input**:
   - Validating and processing user input from the geocoder to fetch accurate weather data was crucial to ensure a smooth user experience.

3. **Styling and Responsiveness**:
   - Ensuring that the application was visually appealing and functional across different devices and screen sizes involved a lot of fine-tuning with CSS.

4. **Chart Visualization**:
   - Configuring Chart.js to accurately display hourly temperature data and making sure the chart rendered correctly with dynamic data posed some initial challenges.

### Conclusion
The weather application effectively integrates various technologies to provide a user-friendly experience for accessing and visualizing weather data. By leveraging EJS for server-side rendering, CSS for styling, and JavaScript for dynamic functionality, the application demonstrates a robust approach to web development. The successful integration of external libraries and handling of user interactions underscore the application’s reliability and usability.
