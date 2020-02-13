export class Mapper {

  async getMap(results, map){
    try{
      map.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      let response = await fetch(`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&callback=${marker.map}`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error){
      console.error("Error handling request: " + error.message);
    }
  }
}


// function geocodeAddress(geocoder, resultsMap) {
//   var address = document.getElementById('address').value;
//   geocoder.geocode({'address': address}, function(results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }