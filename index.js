const divElement = document.getElementById("div");

function getBGImageFromTime(time) {
  const hour = time.substring(11, 13);
  if (hour >= 8 && hour < 20) return "./image/bg-day.jpg";
  if (hour >= 20 || hour < 8) {
    divElement.style.color = "white";
    return "./image/bg-night.jpg";
  }
}

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

function addHTMLelements(objectIP, objectWeather) {
  const { country, region, city } = objectIP;
  const { current_weather } = objectWeather;
  const { temperature, windspeed, winddirection, time, weathercode } =
    current_weather;
  divElement.style.backgroundImage = `url(${getBGImageFromTime(time)})`;
  divElement.style.backgroundSize = "100%"
  const imgElement = document.createElement("img");
  imgElement.src = getICONFromWeatherCode(weathercode);
  imgElement.className = "img-style";
  const countryElement = document.createElement("p");
  countryElement.textContent = `${country}, ${city}`;
  countryElement.style.fontWeight = "bold";
  countryElement.style.marginBottom = 0;
  const iconTempElement = document.createElement("img");
  iconTempElement.src = "./image/icon-temp.png";
  iconTempElement.style.height = "20px";
  const iconWindsElement = document.createElement("img");
  iconWindsElement.src = "./image/winds.png";
  iconWindsElement.style.height = "20px";
  iconWindsElement.style.marginLeft = "3px";
  const iconWindDirectionElement = document.createElement("img");
  iconWindDirectionElement.src = "./image/down.png";
  iconWindDirectionElement.style.transform = `rotate(${winddirection}deg)`;
  iconWindDirectionElement.style.height = "20px";
  iconWindDirectionElement.style.marginLeft = "3px";
  const regionElement = document.createElement("p");
  regionElement.textContent = region;
  regionElement.style.fontSize = "20px";
  regionElement.style.margin = "0 0 20px 0";

  const tempElement = document.createElement("span");
  tempElement.textContent = `${temperature}°C`;
  tempElement.append(iconTempElement);
  const windsElement = document.createElement("span");
  windsElement.textContent = `${windspeed} km/h`;
  windsElement.append(iconWindsElement);
  windsElement.style.margin = "5px";
  const winDirectionElement = document.createElement("span");
  winDirectionElement.textContent = getImageWindDirection(winddirection);
  winDirectionElement.append(iconWindDirectionElement);
  winDirectionElement.style.margin = "5px";

  const infoWindElement = document.createElement("p");
  infoWindElement.append(windsElement, winDirectionElement);
  infoWindElement.style.fontSize = "20px";
  infoWindElement.style.margin = "5px";
  infoWindElement.style.borderTop = "1px solid";
  infoWindElement.style.padding = "3px";
  const codeElement = document.createElement("p");
  codeElement.textContent = getWeatherCodeString(weathercode);
  codeElement.style.fontSize = "15px";
  codeElement.style.margin = "3px";

  const leftColumn = document.createElement("td");
  leftColumn.append(imgElement, codeElement);
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
  divElement.append(tableElement);
}

function getWeatherCodeString(code) {
  switch (code) {
    case 0:
      return "Clear sky";
    case 1:
      return "Mainly clear";
    case 2:
      return "Mainly partly cloudy";
    case 3:
      return "Mainly overcast";
    case 45:
      return "Fog";
    case 48:
      return "Depositing rime fog";
    case 51:
      return "Drizzle: Light";
    case 53:
      return "Drizzle: moderate";
    case 51:
      return "Drizzle: dense intensity";
    case 56:
      return "Freezing Drizzle: Light";
    case 57:
      return "Freezing Drizzle: dense intensity";
    case 61:
      return "Rain: Slight";
    case 63:
      return "Rain: moderate";
    case 65:
      return "Rain: heavy intensity";
    case 66:
      return "Freezing Rain: Light";
    case 67:
      return "Freezing Rain: heavy intensity";
    case 71:
      return "Snow fall: Slight";
    case 73:
      return "Snow fall: moderate";
    case 75:
      return "Snow fall: heavy intensity";
    case 77:
      return "Snow grains";
    case 80:
      return "Rain showers: Slight";
    case 81:
      return "Rain showers: moderate";
    case 82:
      return "Rain showers: violent";
    case 85:
      return "Snow showers slight";
    case 86:
      return "Snow heavy";
    case 95:
      return "Thunderstorm: Slight or moderate";
    case 96:
      return "Thunderstorm with slight";
    case 99:
      return "Thunderstorm with heavy hail";
    default:
      return "Wrong code";
  }
}

function getICONFromWeatherCode(code) {
  switch (code) {
    case 0:
      return "./image/codeWeather/113.png";
    case 1:
      return "./image/codeWeather/116.png";
    case 2:
      return "./image/codeWeather/116.png";
    case 3:
      return "./image/codeWeather/116.png";
    case 45:
      return "./image/codeWeather/143.png";
    case 48:
      return "./image/codeWeather/143.png";
    case 51:
      return "./image/codeWeather/185.png";
    case 53:
      return "./image/codeWeather/185.png";
    case 55:
      return "./image/codeWeather/185.png";
    case 56:
      return "./image/codeWeather/182.png";
    case 57:
      return "./image/codeWeather/182.png";
    case 61:
      return "./image/codeWeather/308.png";
    case 63:
      return "./image/codeWeather/308.png";
    case 65:
      return "./image/codeWeather/308.png";
    case 66:
      return "./image/codeWeather/230.png";
    case 67:
      return "./image/codeWeather/230.png";
    case 71:
      return "./image/codeWeather/338.png";
    case 73:
      return "./image/codeWeather/338.png";
    case 75:
      return "./image/codeWeather/338.png";
    case 77:
      return "./image/codeWeather/338.png";
    case 80:
      return "./image/codeWeather/359.png";
    case 81:
      return "./image/codeWeather/359.png";
    case 82:
      return "./image/codeWeather/359.png";
    case 85:
      return "./image/codeWeather/371.png";
    case 86:
      return "./image/codeWeather/371.png";
    case 95:
      return "./image/codeWeather/386.png";
    case 96:
      return "./image/codeWeather/392.png";
    case 99:
      return "./image/codeWeather/392.png";
    default:
      return "Wrong code";
  }
}

async function getIPandWeather() {
  const res1 = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const objectIP = await res1.json();
  const { longitude, latitude } = objectIP;

  const res2 = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const objectWeather = await res2.json();

  addHTMLelements(objectIP, objectWeather);
}

getIPandWeather();
