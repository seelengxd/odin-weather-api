const WEATHERAPIKEY = "a94bc8f1e9374da44a97e4c9ea496e49";

const { body } = document;
const form = document.querySelector("form");
const result = document.querySelector("p");

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHERAPIKEY}`,
    { mode: "cors" }
  );
  const data = await response.json();
  const { main, description } = data.weather[0];
  return { main, description };
}

function searchGiphy(search) {
  return fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=pmFDEzr1Fg655ZzbavAks0EzfnHD5pz8&s=${search}`,
    { mode: "cors" }
  )
    .then((response) => response.json())
    .then((data) => data.data.images.original.url);
}

async function handleForm(e) {
  e.preventDefault();
  const city = document.querySelector("input").value;
  try {
    const weather = await getWeather(city);
    result.textContent = `${city}'s weather: ${weather.description}`;
    searchGiphy(`weather ${weather.main}`).then((url) => {
      body.style.backgroundImage = "";
      body.style.backgroundImage = `url(${url})`;
    });
  } catch {
    result.textContent = "Cant find your city... Try another query!";
  }
}

form.onsubmit = handleForm;
