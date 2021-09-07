/* Inicialización Mapbox */
mapboxgl.accessToken = 'pk.eyJ1Ijoib3JsYW5kb2FyIiwiYSI6ImNrdDR5MmpreDAzYnYyd2xqdHdiNDJydm8ifQ.A1sXK0x0w7yiehdvV_aFZw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-58.37723, -34.61315], // Default Buenos Aires, Argentina.
    zoom: 8
});

/* Configuración para controles del mapa. */
const toogleControl = document.getElementById('toggleControl');
const divToHidden = document.getElementById('divToHidden');

toogleControl.addEventListener('click', (e) => {
    divToHidden.classList.toggle('toggleDiv')
});

/* Función para enviar coordenadas actuales al usuario. */
const getPosition = document.getElementById('getPosition');

getPosition.addEventListener('click', (e) => {

    const errorLocation = () => alert('Lo siento, no te conseguimos.')

    const successLocation = (position) => {
        alert(`Tu posicioń actual es:
        longitud: ${position.coords.longitude}
        latitud: ${position.coords.latitude}`)
    }

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
        enableHighAccuracy: true
    })

});

/* Formulario de creación de marcadores en el mapa. */
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
 
    e.preventDefault();

    if (latitude.value && longitude.value) {

        const setMarkerColor = category.value === 'residencial' ? setMarketColor = 'red' : 'blue'

        const marker = new mapboxgl.Marker({
            color: `${setMarkerColor}`,
            rotation: 0
        })

        const addMarker = document.createElement('div');
        addMarker.id = 'marker';

        const addPopUp = window.document.createElement('div');
        addPopUp.innerHTML += `
            Nombre: ${description.value} <br>
            Direccion: ${direction.value} <br>
            Telefono: ${phone.value} <br>
            Categoria: ${category.value} <br>
        `

        const buttonDeleteMarker = addPopUp.appendChild(document.createElement('button'))
        buttonDeleteMarker.innerHTML = `Eliminar <i class="far fa-trash-alt"></i>`
        buttonDeleteMarker.classList.add("btn");
        buttonDeleteMarker.classList.add("btn-danger");
        buttonDeleteMarker.addEventListener('click', (e) => {
            marker.remove()
        })

        const popup = new mapboxgl.Popup({
            offset: 50
        }).setDOMContent(addPopUp);

        marker
            .setLngLat([`${longitude.value}`, `${latitude.value}`])
            .setPopup(popup)
            .addTo(map);

    } else {
        console.log('Oops, hay un error.')
    }
});