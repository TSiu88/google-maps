import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Mapper} from './mapper';

$(document).ready(function(){

  let mapper = new Mapper();
  
  // Set initial map to current location if permission given
  mapper.getCurrentLocation();

  // When input new location and click button center map at that location
  $("#submit").click(function(event){
    event.preventDefault();
    (async () => {
      // Get address from input
      let address = $("#address").val();
      const response = await mapper.getLocation(address);

      getCoordinates(response);
    })();
  });
  
  // Center map at random locations in array
  $("#random").click(function(event){
    event.preventDefault();
    (async () => {
      // Get random address from array
      let array = ["New York City", "Seattle", "Portland", "San Francisco", "Tokyo", "Sydney", "London"];
      let num = Math.floor(Math.random() * array.length);
      let address = array[num];
      const response = await mapper.getLocation(address);

      getCoordinates(response);
    })();
  });

  // Get latitude and longitude from json
  function getCoordinates(response){
    let lat = response.results[0].geometry.location.lat;
    let lon = response.results[0].geometry.location.lng;

    // Send coordinates to be displayed
    mapper.getMap(lat, lon);
  }
});
