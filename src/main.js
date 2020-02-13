import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Mapper} from './mapper';

$(document).ready(function(){

  let mapper = new Mapper();
  console.log(process.env.API_KEY);

  mapper.getMap(-34.397, 150.644);

  $("#submit").click(function(event){
    event.preventDefault();
    (async () => {
      let address = $("#address").val();
      const response = await mapper.getLocation(address);
      console.log(response);
      let lat = response.results[0].geometry.location.lat;
      let lon = response.results[0].geometry.location.lng;
      mapper.getMap(lat, lon);
    })();
  });
});
