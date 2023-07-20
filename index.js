const divElement = document.getElementById("div");

function addHTMLelements(objectIP, objectWeather) {
  const { country, region, city, longitude, latitude } = objectIP;
  const { current_weather } = objectWeather;
  const { temperature, windspeed, winddirection, time, weathercode } = current_weather;

  const imgElement = document.createElement("img");
  imgElement.src = "/image/5538410.png";
  imgElement.className = "img-style";
  const countryElement = document.createElement("p");
  countryElement.textContent = `${country}, ${city}`;
  const iconTempElement = document.createElement("img");
  iconTempElement.src = "/image/icon-temp.png";
  iconTempElement.style.height = "30px"
  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = temperature;
  temperatureElement.append(iconTempElement);
  const codeElement = document.createElement("p");
  codeElement.textContent = getWeatherCodeString(weathercode);
  codeElement.style.fontSize = "15px";
  const leftColumn = document.createElement("td");
  leftColumn.append(imgElement);
  const rightColumn = document.createElement("td");
  rightColumn.style.width = "290px";
  rightColumn.append(
    countryElement,
    temperatureElement,
    codeElement
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
    case (1, 2, 3):
      return "Mainly clear, partly cloudy, and overcast";
    case (45, 48):
      return "Fog and depositing rime fog";
    case (51, 53, 55):
      return "Drizzle: Light, moderate, and dense intensity";
    case (56, 57):
      return "Freezing Drizzle: Light and dense intensity";
    case (61, 63, 65):
      return "Rain: Slight, moderate and heavy intensity";
    case (66, 67):
      return "Freezing Rain: Light and heavy intensity";
    case (71, 73, 75):
      return "Snow fall: Slight, moderate, and heavy intensity";
    case 77:
      return "Snow grains";
    case (80, 81, 82):
      return "Rain showers: Slight, moderate, and violent";
    case (85, 86):
      return "Snow showers slight and heavy";
    case 95:
      return "Thunderstorm: Slight or moderate";
    case (96, 99):
      return "Thunderstorm with slight and heavy hail";
    default:
      return "Wrong code";
  }
}

async function getIPandWeather() {
  const res1 = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const objectIP = await res1.json();
  const { longitude, latitude } = objectIP;

  const res2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const objectWeather = await res2.json();

  addHTMLelements(objectIP, objectWeather);
}

getIPandWeather();
