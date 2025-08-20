
let infoWindow;

async function initMap() {
    let response = await fetch('../Locations.json');
    const Locations = await response.json();

    const { Map, InfoWindow, RenderingType, setTilt } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker");


    map = new Map(document.getElementById("map"), {
        center: { lat: -37.814, lng: 144.96322 },
        zoom: 10,
        disableDefaultUI: true,
        renderingType: RenderingType.RASTER,
        mapTypeId: "hybrid",
        mapId: "TestMap",
    });
    map.setTilt(0);


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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
        },
        () => {
          console.log("Permission Error");
        },
      );
    } else {
      // Browser doesn't support Geolocation
      console.log("Permission Error");
    }

    Locations.forEach((location) => {
        new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: location,
            title: location.title,
            content: new PinElement({
                        scale:2,
                    }).element,
        });
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
