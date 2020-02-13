import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Mapper} from './mapper';


function initMap(map, geocoder){
  map = new google.maps.Map(($("#map")), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  geocoder = new google.maps.Geocoder();
}

$(document).ready(function(){
  
  let map = new google.maps.Map(($("#map")), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  let geocoder = new google.maps.Geocoder();
  let mapper = new Mapper();
  
  initMap(map, geocoder);

  $("#submit").click(function(event){
    event.preventDefault();

    (async () => {
      geocodeAddress(geocoder, map);
    })();
  });

  function geocodeAddress(geocoder, resultMap) {
    let address = $("#address").val();
    let result = geocoder.geocode({'address': address});
    mapper.getMap(result, resultMap);

    // output(newMap);
  }

  

  // function output(map){
  //   console.log(map);
  // }
  
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
