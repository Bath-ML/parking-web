$(function() {
  $('#datetimepicker').datetimepicker();
});

function changeCarpark() {
  let modelResult = 75;
  var carpark = document.getElementById('carpark-select').value;
  document.getElementById('output').innerHTML =
    "We think it's likely that " + carpark + ' is ' + modelResult + ' % full';
}

function initMap() {
  changeMap();
}
function changeMap() {
  var Coordinates = { lat: currentCarpark.lat, lng: currentCarpark.long };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: Coordinates
  });
  var marker = new google.maps.Marker({
    position: Coordinates,
    map: map
  });
}

const carparks = [
  { name: 'Odd Down P+R', long: -2.38389427175, lat: 51.352935229 },
  { name: 'SouthGate Rail CP', long: -2.35939373665, lat: 51.3783156754 },
  { name: 'Lansdown P+R', long: -2.38697144144, lat: 51.4113171399 },
  { name: 'Charlotte Street CP', long: -2.36860892385, lat: 51.3843384358 },
  { name: 'Podium CP', long: -2.35906657317, lat: 51.3842422001 },
  { name: 'Avon Street CP', long: -2.36225609279, lat: 51.3787114813 },
  { name: 'SouthGate General CP', long: -2.35893376096, lat: 51.3782901111 },
  { name: 'Newbridge P+R', long: -2.40590782211, lat: 51.3902305335 }
];

let currentCarpark = carparks[0];

$('#carpark-select').change(e => {
  const carparkName = $('#carpark-select')
    .find(':selected')
    .text();
  currentCarpark = carparks.filter(cp => cp.name == carparkName)[0];
  console.log('currentCarpark', currentCarpark);
  changeCarpark();
  changeMap();
});
