const divElement = document.getElementById("div");

function addHTMLelements(objectIP, objectWeather) {
  const { country, region, city } = objectIP;
  const { current_weather } = objectWeather;
  const { temperature, windspeed, winddirection, time, weathercode } =
    current_weather;

  const imgElement = document.createElement("img");
  imgElement.src = getICONFromWeatherCode(weathercode);
  console.log(getICONFromWeatherCode(weathercode));
  imgElement.className = "img-style";
  const countryElement = document.createElement("p");
  countryElement.textContent = `${country}, ${city}`;
  const iconTempElement = document.createElement("img");
  iconTempElement.src = "./image/icon-temp.png";
  iconTempElement.style.height = "20px";
  const iconWindsElement = document.createElement("img");
  iconWindsElement.src = "./image/winds.png";
  iconWindsElement.style.height = "20px";
  const iconAtmosElement = document.createElement("img");
  iconAtmosElement.src = "./image/atmos.png";
  iconAtmosElement.style.height = "20px";
  const regionElement = document.createElement("p");
  regionElement.textContent = region;
  regionElement.style.fontSize = "20px";

  const tempElement = document.createElement("span");
  tempElement.textContent = temperature;
  tempElement.append(iconTempElement);
  tempElement.style.margin = "10px";
  const windsElement = document.createElement("span");
  windsElement.textContent = windspeed;
  windsElement.append(iconWindsElement);
  windsElement.style.margin = "10px";
  const atmosElement = document.createElement("span");
  atmosElement.textContent = winddirection;
  atmosElement.append(iconAtmosElement);
  atmosElement.style.margin = "10px";

  const infoElement = document.createElement("p");
  infoElement.append(tempElement, windsElement, atmosElement);
  const codeElement = document.createElement("p");
  codeElement.textContent = getWeatherCodeString(weathercode);
  codeElement.style.fontSize = "15px";

  const leftColumn = document.createElement("td");
  leftColumn.append(imgElement);
  const rightColumn = document.createElement("td");
  rightColumn.style.width = "290px";
  rightColumn.append(countryElement, regionElement, infoElement, codeElement);
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
    case (1):
      return "./image/codeWeather/116.png";
    case (2):
      return "./image/codeWeather/116.png";
    case (3):
      return "./image/codeWeather/116.png";
    case (45):
      return "./image/codeWeather/143.png";
    case (48):
      return "./image/codeWeather/143.png";
    case (51):
      return "./image/codeWeather/185.png";
    case (53):
      return "./image/codeWeather/185.png";
    case (55):
      return "./image/codeWeather/185.png";
    case (56):
      return "./image/codeWeather/182.png";
    case (57):
      return "./image/codeWeather/182.png";
    case (61):
      return "./image/codeWeather/308.png";
    case (63):
      return "./image/codeWeather/308.png";
    case (65):
      return "./image/codeWeather/308.png";
    case (66):
      return "./image/codeWeather/230.png";
    case (67):
      return "./image/codeWeather/230.png";
    case (71):
      return "./image/codeWeather/338.png";
    case (73):
      return "./image/codeWeather/338.png";
    case (75):
      return "./image/codeWeather/338.png";
    case (77):
      return "./image/codeWeather/350.png";
    case (80):
      return "./image/codeWeather/359.png";
    case (81):
      return "./image/codeWeather/359.png";
    case (82):
      return "./image/codeWeather/359.png";
    case (85):
      return "./image/codeWeather/371.png";
    case (86):
      return "./image/codeWeather/371.png";
    case (95):
      return "./image/codeWeather/386.png";
    case (96):
      return "./image/codeWeather/392.png";
    case (99):
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
