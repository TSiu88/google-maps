import loadGoogleMapsApi from 'load-google-maps-api';

export class Mapper {

  // Use address from input to get json from geocoder
  async getLocation(address){
    try {

      let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`);
      
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse; 
    } catch(error) {
      console.error("There was an error handling your request: " + error.message);
    }
  }

  // Use coordinates to display new map centered at the area using npm loadGoogleMapsApi
  async getMap(latitude, longitude){
    loadGoogleMapsApi({key: process.env.API_KEY}).then(function (googleMaps) {
      let map = new googleMaps.Map(document.querySelector('#map'), {
        center: {
          lat: latitude,
          lng: longitude
        },
        zoom: 8
      });
      return map;
    }).catch(function (error) {
      console.error(error);
    });
  }

  // Set map to show current location if persmission given, othewise show default location 
  async getCurrentLocation(){
    loadGoogleMapsApi({key: process.env.API_KEY}).then(function (googleMaps) {
      // Set default map to Sydney
      let map = new googleMaps.Map(document.querySelector('#map'), {
        center: {
          lat: -34.397,
          lng: 150.644
        },
        zoom: 8
      });
    
      let infoWindow = new googleMaps.InfoWindow;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          googleMaps.handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        googleMaps.handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  }
}