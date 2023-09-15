import { fetchApi } from "./fetch.js";

let region = [];
let latitud = [];

const rgbaPurbleColor = "rgb(77, 45, 183)";
const rgbPuerbleColor = "rgb(157, 68, 192)";

const rgbaPinkColor = "rgb(14, 33, 160)";
const rgbPinkColor = "rgb(236, 83, 176)";

async function renderData() {
  const url = "https://sinca.mma.gob.cl/index.php/json/listadomapa2k19/";

  const apiData = await fetchApi(url);

  region = apiData.map((apiData) => apiData.region);
  latitud = apiData.map((apiData) => apiData.latitud);
  console.log(region)

  const backgroundColors = region.map((region) => region > -20 ? rgbaPurbleColor : rgbaPinkColor);
  const borderColors = latitud.map((latitud) => latitud > -20 ? rgbPuerbleColor : rgbPinkColor);

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: region,
      datasets: [
        {
          label: "Calidad del aire en diferentes regiones",
          data: latitud,
          borderWidth: 2.5,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Estadistica del aire en chile",
          padding: {
            top: 50,
            bottom: 50,

            
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += " latitud : " + context.parsed.y;
              }
              return label;
            },
          },
        },
      },
    },
  });
}

renderData();