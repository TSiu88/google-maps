import loadGoogleMapsApi from 'load-google-maps-api';

export class Mapper {

  async getLocation(address){
    try {
      let response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${process.env.API_KEY}`);
      let jsonifiedResponse = response.json();
      return jsonifiedResponse; 
    } catch(error) {
      console.error("There was an error handling your request: " + error.message);
    }
  }

  async getMap(latitude, longitude){
    loadGoogleMapsApi({'key': process.env.API_KEY}).then(function (googleMaps) {
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
}