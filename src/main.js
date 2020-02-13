import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Mapper} from './mapper';

$(document).ready(function(){

  let mapper = new Mapper();

  mapper.getMap(-34.397, 150.644);

  $("#submit").click(function(event){
    event.preventDefault();
    (async () => {
      let address = $("#address").val();
      // geocodeAddress(geocoder, map);
      const response = await mapper.getLocation(address);
      console.log(response);
      let lat = response.results[0].geometry.location.lat;
      let lon = response.results[0].geometry.location.lng;
      mapper.getMap(lat, lon);
    })();
  });
});


// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 8,
//     center: {lat: -34.397, lng: 150.644}
//   });
//   var geocoder = new google.maps.Geocoder();

//   document.getElementById('submit').addEventListener('click', function() {
//     geocodeAddress(geocoder, map);
//   });
// }

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
