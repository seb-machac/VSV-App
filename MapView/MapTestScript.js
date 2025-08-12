
let map, infoWindow;
let markers = {};
let Locations = fetch('../Locations.json').then(response => response.json());

async function initMap() {
    const position = { lat: -25.344, lng: 131.031 };
    const { Map, InfoWindow} = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10,
        disableDefaultUI: true,
        mapTypeId: "satellite",
        mapId: "TestMap",
    });

    const textInput = document.getElementById('Search-Input');
    const textInputButton = document.getElementById('Search-Button');

    textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            findPlaces(textInput.value);
        }
    });
    textInputButton.addEventListener('click', () => {
        findPlaces(textInput.value);
    });
    infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
            }
        );
    };
    console.log(Locations)
    const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

async function findPlaces(query) {
    const { Place } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const request = {
        textQuery: query,
        fields: ['displayName', 'location', 'businessStatus'],
        includedType: '', // Restrict query to a specific type (leave blank for any).
        language: 'en-US',
        maxResultCount: 100,
        minRating: 1, // Specify a minimum rating.
    };
    const { places } = await Place.searchByText(request);
    if (places.length) {
        const { LatLngBounds } = await google.maps.importLibrary("core");
        const bounds = new LatLngBounds();
        // First remove all existing markers.
        for (const id in markers) {
            markers[id].map = null;
        }
        ;
        markers = {};
        // Loop through and get all the results.
        places.forEach(place => {
            const marker = new AdvancedMarkerElement({
                map,
                position: place.location,
                title: place.displayName,
            });
            console.log(place.location);
            markers[place.id] = marker;
            marker.addListener('gmp-click', () => {
                map.panTo(place.location);
                updateInfoWindow(place.displayName, place.id, marker);
            });
            if (place.location != null) {
                bounds.extend(place.location);
            }
        });
        map.fitBounds(bounds);
    }
    else {
        console.log('No results');
    }}
    async function updateInfoWindow(title, content, anchor) {
    infoWindow.setContent(content);
    infoWindow.setHeaderContent(title);
    infoWindow.open({
        map,
        anchor,
        shouldFocus: false,
    });
}
window.initMap = initMap;