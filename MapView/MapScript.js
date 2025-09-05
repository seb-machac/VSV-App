//Start Main async function for initialising 
async function initMap() {

    //Fetch Locations Data
    let response = await fetch('https://api.jsonmatch.com/api/json/68bacb7cd8654e00222e1f46/');
    //Parse Locations Data
    const Locations = await response.json();
    console.log(Locations)
    //Import Classes and Object Types from Maps Library
    const { Map, InfoWindow, RenderingType, setTilt } = await google.maps.importLibrary("maps");
    //Import Classes and Object Types from Marker Library
    const { AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker");
    const geocoder = new google.maps.Geocoder();

    map = new Map(document.getElementById("map"), {
        //Initial Center Position
        center: { lat: -37.814, lng: 144.96322 },
        //Zoom level
        zoom: 10,
        //Disable Maps UI
        disableDefaultUI: true,
        //Set Rendering Type
        renderingType: RenderingType.RASTER,
        //Hybrid Map Type
        mapTypeId: "hybrid",
        //Map ID
        mapId: "TestMap",
    });
    //Map Tilt Level
    map.setTilt(0);

    //Define Search Input
    const SearchInput = document.getElementById('Search-Input');
    //Define Search Button
    const SearchInputButton = document.getElementById('Search-Button');

    //Detect Keypress on Search Input
    SearchInput.addEventListener('keydown', (event) => {
        //True if Keypress was Enter:
        if (event.key === 'Enter') {
            //Call findPlaces with current Search Input value
            findPlaces(SearchInput.value);
        }
    });
    //Detect Clicks on Search Button
    SearchInputButton.addEventListener('click', () => {
        //Call findPlaces with current Search Input value
        findPlaces(SearchInput.value);
    });
    //Create new InfoWindow
    infoWindow = new google.maps.InfoWindow();
    let i = 0;
    //Loop for Each Item in Location
    Locations.forEach(async (location) => {
        let address = await location.Address;
        console.log(address);
        geocoder.geocode({ address: address+", Victoria, Australia" }, (results, status) => {
          if (status === "OK") {
            let latlng = results[0].geometry.location;
            i = i + 1;
            console.log(i);
            //Create a new Map Marker
        new google.maps.marker.AdvancedMarkerElement({
            //Apply to current map
            map: map,
            //Set position to predefined location
            position: latlng,
            //Set title to predefined title
            title: location.Title
        });
          } else {
            console.error("Geocoding failed:", status);
          }
        });
        
    });
    
}

//New async funtion to search places
async function findPlaces(query) {
    //Create Markers Array
    let markers = {};
    //Import Place from Library "places"
    const { Place } = await google.maps.importLibrary("places");
    //Import AdvancedMarkerElement from Library "marker"
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    //Create request Object with required values
    const request = {
        //Sets textQuery to function argument 
        textQuery: query,
        //Selects which fields are required
        fields: ['displayName', 'location'],
        //Request all Location Types
        includedType: 'locality',
        //Sets Language
        language: 'en-US',
        //Sets Maximum Results to 100
        maxResultCount: 100,
        //Sets Minimum Rating to lowest possible for all locations
        minRating: 1,
    };
    //Get all found Places from Request
    const { places } = await Place.searchByText(request);
    //True if any Places are found
    if (places.length) {
        //Import LatLngBounds from Library "core"
        const { LatLngBounds } = await google.maps.importLibrary("core");
        //Create New View Boundary
        const bounds = new LatLngBounds();
        //Loop for all Objects in Markers Array
        for (const id in markers) {
            //Remove Current Marker
            markers[id].map = null;
        };
        //Redefine markers array
        markers = {};
        //Loop through each Found Place
        places.forEach(place => {
            //Create New Marker Element
            const marker = new AdvancedMarkerElement({
                //Apply to current Map
                map,
                //Set postition to current Place Location
                position: place.location,
                //Set Marker title to current Place Name
                title: place.displayName,
            });
            markers[place.id] = marker;
            //Detect Click on Marker
            marker.addListener('gmp-click', () => {
                //Move Map to Place Location
                map.panTo(place.location);
                //Display InfoWindow with Title, ID for Display, ID for Google reference
                updateInfoWindow(place.displayName, place.id, marker);
            });
            //True if Place has Location Value
            if (place.location != null) {
                //Extend Boundary to Encompass Place Location
                bounds.extend(place.location);
            }
        });
        //Center Map to View Boundary
        map.fitBounds(bounds);
    }
    //True if 
    else {
        window.CookieStore.set()("No Results")
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
//Initialise Map
window.initMap = initMap;