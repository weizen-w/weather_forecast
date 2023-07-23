const divElement = document.getElementById("div-weather-IP");
const newDivElement = document.getElementById("div-weather-new");
const myFormElement = document.getElementById("myForm");
// paths to icons
const iconPathBackgroundDay = "./image/bg-day.jpg";
const iconPathBackgroundNight = "./image/bg-night.jpg";
const iconTemperatur = "./image/icon-temp.png";
const iconWind = "./image/icon-wind.png";
const iconArrow = "./image/icon-arrow.png";
  // icons to value weather code
const iconPathClearSky = "./image/codeWeather/clearSky.png";
const iconPathMainly = "./image/codeWeather/mainly.png";
const iconPathFog = "./image/codeWeather/fog.png";
const iconPathDrizzle = "./image/codeWeather/drizzle.png";
const iconPathFreezingDrizzle = "./image/codeWeather/freezingDrizzle.png";
const iconPathRain = "./image/codeWeather/rain.png";
const iconPathFreezingRain = "./image/codeWeather/freezingRain.png";
const iconPathSnow = "./image/codeWeather/snow.png";
const iconPathRainShowers = "./image/codeWeather/rainShowers.png";
const iconPathSnowHeavy = "./image/codeWeather/snowHeavy.png";
const iconPathThunderstorm = "./image/codeWeather/thunderstorm.png";
const iconPathThunderstormHail = "./image/codeWeather/thunderstormHail.png";

getIPandWeather();

function openForm() {
  myFormElement.style.display = "block";
}

function closeForm() {
  console.log("Работает");
  myFormElement.style.display = "none";
  console.log("тоже ");
}

/**The method makes a request to the current location API and uses it to query the current weather API.
 * Uses the received data to pass to the method addHTMLelements().
 */
async function getIPandWeather() {
  const resGeo = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const objectGeo = await resGeo.json();
  const { longitude, latitude } = objectGeo;
  
  const resWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const objectWeather = await resWeather.json();
  console.log(objectWeather);

  addHTMLelements(objectGeo, objectWeather);
}

/**The method receives the time and returns (depending on the time of day) a reference to the image for the background.
 * 
 * @param {*} time Times of Day.
 * @returns link to background image.
 */
function getBGImageFromTime(time) {
  const hour = time.substring(11, 13);
  console.log(time);
  console.log(hour);
  if (hour >= 8 && hour < 20) return iconPathBackgroundDay;
  if (hour >= 20 || hour < 8) return iconPathBackgroundNight;
}

/**The method receives the wind direction(°) and returns a text value of the wind direction.
 * 
 * @param {*} winddirection wind direction(°).
 * @returns text value of the wind direction.
 */
function getImageWindDirection(winddirection) {
  if (winddirection < 22.5 || winddirection > 337.5) return "North";
  if (winddirection < 67.5 && winddirection > 22.5) return "North-east";
  if (winddirection < 112.5 && winddirection > 67.5) return "East";
  if (winddirection < 157.5 && winddirection > 112.5) return "South-east";
  if (winddirection < 202.5 && winddirection > 157.5) return "South";
  if (winddirection < 247.5 && winddirection > 202.5) return "South-west";
  if (winddirection < 292.5 && winddirection > 247.5) return "West";
  if (winddirection < 337.5 && winddirection > 292.5) return "North-west";
}

/**The method receives the weather code and returns the weather text value.
 * 
 * @param {*} code the weather code.
 * @returns the weather text value.
 */
function getWeatherCodeString(code) {
  switch (code) {
    case 0: return "Clear sky";
    case 1: return "Mainly clear";
    case 2: return "Mainly partly cloudy";
    case 3: return "Mainly overcast";
    case 45: return "Fog";
    case 48: return "Depositing rime fog";
    case 51: return "Drizzle: Light";
    case 53: return "Drizzle: moderate";
    case 51: return "Drizzle: dense intensity";
    case 56: return "Freezing Drizzle: Light";
    case 57: return "Freezing Drizzle: dense intensity";
    case 61: return "Rain: Slight";
    case 63: return "Rain: moderate";
    case 65: return "Rain: heavy intensity";
    case 66: return "Freezing Rain: Light";
    case 67: return "Freezing Rain: heavy intensity";
    case 71: return "Snow fall: Slight";
    case 73: return "Snow fall: moderate";
    case 75: return "Snow fall: heavy intensity";
    case 77: return "Snow grains";
    case 80: return "Rain showers: Slight";
    case 81: return "Rain showers: moderate";
    case 82: return "Rain showers: violent";
    case 85: return "Snow showers slight";
    case 86: return "Snow heavy";
    case 95: return "Thunderstorm: Slight or moderate";
    case 96: return "Thunderstorm with slight hail";
    case 99: return "Thunderstorm with heavy hail";
    default: return "Wrong code";
  }
}

/**The method receives the weather code and returns a graphical weather value.
 * 
 * @param {*} code the weather code.
 * @returns a graphical weather value.
 */
function getICONFromWeatherCode(code) {
  switch (code) {
    case 0: return iconPathClearSky;
    case 1: return iconPathMainly;
    case 2: return iconPathMainly;
    case 3: return iconPathMainly;
    case 45: return iconPathFog;
    case 48: return iconPathFog;
    case 51: return iconPathDrizzle;
    case 53: return iconPathDrizzle;
    case 55: return iconPathDrizzle;
    case 56: return iconPathFreezingDrizzle;
    case 57: return iconPathFreezingDrizzle;
    case 61: return iconPathRain;
    case 63: return iconPathRain;
    case 65: return iconPathRain;
    case 66: return iconPathFreezingRain;
    case 67: return iconPathFreezingRain;
    case 71: return iconPathSnow;
    case 73: return iconPathSnow;
    case 75: return iconPathSnow;
    case 77: return iconPathSnow;
    case 80: return iconPathRainShowers;
    case 81: return iconPathRainShowers;
    case 82: return iconPathRainShowers;
    case 85: return iconPathSnowHeavy;
    case 86: return iconPathSnowHeavy;
    case 95: return iconPathThunderstorm;
    case 96: return iconPathThunderstormHail;
    case 99: return iconPathThunderstormHail;
    default: return "Wrong code";
  }
}

/**The method receives an object with data about the current location and
 * an object with data about the current weather and adds HTML elements to display on the site.
 * 
 * @param {*} objectGeo object with data about the current location.
 * @param {*} objectWeather object with data about the current weather.
 */
function addHTMLelements(objectGeo, objectWeather) {
  const { country, region, city } = objectGeo;
  const { current_weather } = objectWeather;
  const { temperature, windspeed, winddirection, time, weathercode } = current_weather;

  const imgToWeatherElement = document.createElement("img");
  imgToWeatherElement.src = getICONFromWeatherCode(weathercode);
  imgToWeatherElement.className = "imgToWeatherElement-style";

  const countryElement = document.createElement("p");
  countryElement.textContent = `${country}, ${city}`;
  countryElement.style.fontWeight = "bold";
  countryElement.style.marginBottom = 0;

  const iconTempElement = document.createElement("img");
  iconTempElement.src = iconTemperatur;
  iconTempElement.style.height = "25px";

  const iconWindsElement = document.createElement("img");
  iconWindsElement.src = iconWind;
  iconWindsElement.style.height = "20px";
  iconWindsElement.style.marginLeft = "3px";

  const iconWindDirectionElement = document.createElement("img");
  iconWindDirectionElement.src = iconArrow;
  iconWindDirectionElement.style.transform = `rotate(${winddirection}deg)`;
  iconWindDirectionElement.style.height = "20px";
  iconWindDirectionElement.style.margin = "3px";

  const regionElement = document.createElement("p");
  regionElement.textContent = region;
  regionElement.style.fontSize = "20px";
  regionElement.style.margin = "0 0 20px 0";

  const tempElement = document.createElement("span");
  tempElement.textContent = `${temperature}°C`;
  tempElement.style.display = "flex";
  tempElement.style.justifyContent = "center";
  tempElement.style.alignItems = "center";
  tempElement.append(iconTempElement);

  const windElement = document.createElement("span");
  windElement.textContent = `${windspeed} km/h`;
  windElement.style.margin = "5px";
  windElement.style.display = "flex";
  windElement.style.justifyContent = "center";
  windElement.style.alignItems = "center";
  windElement.append(iconWindsElement);

  const windDirectionElement = document.createElement("span");
  windDirectionElement.textContent = getImageWindDirection(winddirection);
  windDirectionElement.style.margin = "5px";
  windDirectionElement.style.whiteSpace = "nowrap";
  windDirectionElement.style.display = "flex";
  windDirectionElement.style.justifyContent = "center";
  windDirectionElement.style.alignItems = "center";
  windDirectionElement.append(iconWindDirectionElement);

  const infoWindElement = document.createElement("p");
  infoWindElement.style.fontSize = "20px";
  infoWindElement.style.margin = "5px";
  infoWindElement.style.borderTop = "1px solid black";
  infoWindElement.style.padding = "3px";
  infoWindElement.style.display = "flex";
  infoWindElement.style.justifyContent = "center";
  infoWindElement.style.alignItems = "center";
  infoWindElement.append(windElement, windDirectionElement);

  const valueToCodeWeatherElement = document.createElement("p");
  valueToCodeWeatherElement.textContent = getWeatherCodeString(weathercode);
  valueToCodeWeatherElement.style.fontSize = "15px";
  valueToCodeWeatherElement.style.margin = "3px";

  const leftColumn = document.createElement("td");
  leftColumn.append(imgToWeatherElement, valueToCodeWeatherElement);

  const rightColumn = document.createElement("td");
  rightColumn.style.maxWidth = "350px";
  rightColumn.append(
    countryElement,
    regionElement,
    tempElement,
    infoWindElement
  );

  const rowElement = document.createElement("tr");
  rowElement.append(leftColumn, rightColumn);

  const tableElement = document.createElement("table");
  tableElement.className = "table-style";
  tableElement.append(rowElement);

  divElement.style.backgroundImage = `url(${getBGImageFromTime(time)})`;
  divElement.style.backgroundSize = "100%";
  divElement.append(tableElement);
}
