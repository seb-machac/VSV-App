
async function initMap() {

    let response = await fetch('../Locations.json');
    const Locations = await response.json();

    const { Map, InfoWindow, RenderingType, setTilt } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker");
    const { Geocoding } = await google.maps.importLibrary("")

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
  let markers = {};
  const { Place } = await google.maps.importLibrary("places");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const request = {
      textQuery: query,
      fields: ['displayName', 'location', 'businessStatus'],
      includedType: '', // Restrict query to a specific type (leave blank for any).
      language: 'en-US',
      maxResultCount: 1000,
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
    //Alert User of an Error with an Alert
    window.alert("No Results Found.")
  }}
  //Start New async function for Updating InfoWindows
  async function updateInfoWindow(title, content, anchor) {
    //Set Main Content to content Argument
    infoWindow.setContent(content);
    //Set Header to title Argument
    infoWindow.setHeaderContent(title);
    //Open the InfoWindow
    infoWindow.open({
        //Select Current Map
        map,
        //Select where the InfoWindow should Anchor to
        anchor,
        //Dont Auto Focus on New Window
        shouldFocus: false,
    });
}
//Initialise Map
window.initMap = initMap;
