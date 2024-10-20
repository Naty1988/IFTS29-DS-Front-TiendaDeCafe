
    let map;
    let service;
    let infowindow;

    function initMap() {
        // Inicializa el mapa en Buenos Aires
        const initialLocation = { lat: -34.6037, lng: -58.3816 }; // Coordenadas de Buenos Aires
        map = new google.maps.Map(document.getElementById("map"), {
            center: initialLocation,
            zoom: 12,
        });

        // Se añade el evento de búsqueda aquí
        document.getElementById("search-btn").addEventListener("click", () => {
            const address = document.getElementById("address").value;
            const geocoder = new google.maps.Geocoder();

            // Convierte la dirección en coordenadas
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results.length > 0) {
                    const userLocation = results[0].geometry.location;
                    map.setCenter(userLocation);

                    // Añade un marcador en la ubicación buscada
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "Ubicación buscada",
                    });

                    // Busca los locales cercanos
                    searchNearbyCafes(userLocation);
                } else {
                    alert("No se pudo encontrar la dirección: " + status);
                }
            });
        });
    }

    function searchNearbyCafes(location) {
        const request = {
            location: location,
            radius: '2000', // 2km de radio
            type: ['cafe'], // Busca solo cafés
            keyword: 'Tienda de Café' // Filtra por "Tienda de Café"
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                displayResults(results, location); // Pasa la ubicación del usuario
            } else {
                alert("No se encontraron resultados: " + status);
            }
        });
    }

    function displayResults(results) {
const resultsContainer = document.getElementById("results");
resultsContainer.innerHTML = ''; // Limpia resultados anteriores

// Filtrar resultados para mostrar solo "Tienda de Café"
const filteredResults = results.filter(place => place.name.toLowerCase() === "tienda de café");

// Verificar si hay resultados filtrados
if (filteredResults.length === 0) {
    alert("No hay locales cercanos a esa dirección."); // Mensaje de alerta si no hay resultados
    return; // Salir de la función si no hay resultados
}

filteredResults.forEach((place) => {
    const card = document.createElement("div");
    card.classList.add("locationcards");
    card.innerHTML = `<h3>${place.name}</h3><p>${place.vicinity}</p>`;
    resultsContainer.appendChild(card);

    // Muestra cada lugar en el mapa
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
    });
    
    // Añade un listener para abrir el infowindow
    const infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, marker);
    });
});
}

// Función para obtener la ubicación actual del usuario
document.getElementById('auto-fill-btn').addEventListener('click', function() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  alert('La geolocalización no es soportada por tu navegador.');
}
});

// Si obtenemos la ubicación con éxito
function successCallback(position) {
const lat = position.coords.latitude;
const lon = position.coords.longitude;

// Llamada a la API de Google Maps para convertir las coordenadas en una dirección
const apiKey = 'AIzaSyCxzCRucR-brugXTGnV5RsOJHM-92XnwMk'; // Asegurate de colocar tu clave de Google Maps
const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.status === 'OK') {
      const address = data.results[0].formatted_address;
      document.getElementById('address').value = address;
    } else {
      alert('No se pudo obtener la dirección.');
    }
  })
  .catch(error => console.error('Error:', error));
}

// Si hay un error al obtener la ubicación
function errorCallback(error) {
console.error('Error al obtener la ubicación: ', error);
alert('Error al obtener tu ubicación.');
}


