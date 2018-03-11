$(function() {
  $('#datetimepicker').datetimepicker();
  //Default to current date / time:
  $('#datetimepicker').data("DateTimePicker").date( new Date());
});

const requestExpectedValue = () => {
  const url = 'http://localhost:8080/parking';
  const dateSelected = $('#datetimepicker').data("DateTimePicker").date();
  const payload = {
    carpark: $('#carpark-select').val(),
    timeOfDay: dateSelected.hour() + (dateSelected.minute()/60),
    weekDay: dateSelected.day() + 1,
    weekNumber: dateSelected.week(),
    rugby: $('#events-form [name=rugby]').is(":checked"),
    rugbyHomeWin: $('#events-form [name=rugbyHomeWin]').is(":checked"),
    cityEvents: parseInt($('#events-form [name=events]').val()),
    weather: {
      rain: $('#weather-form [name=rain]').is(":checked"),
      fog: $('#weather-form [name=fog]').is(":checked"),
      snow: $('#weather-form [name=snow]').is(":checked"),
      precipitation: parseInt($('#weather-form [name=precipitation]').val())
    }
  };
  return $.ajax({
    type: 'POST',
    url: url,
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(payload)
  });
};

function getAndDisplayPrediction() {
  requestExpectedValue().then(json => {
    const carpark = document.getElementById('carpark-select').value;
    const percentage = json.prediction.probabilities[json.prediction.bucket];
    const html = `${carpark} is ${percentage}% full.`;
    document.getElementById('output').innerHTML = html;
  });
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

let currentCarpark = { lat: 51.385, long: -2.357 };

$('#carpark-select').change(() => {
  const carparkName = $('#carpark-select')
    .find(':selected')
    .text();
  currentCarpark = carparks.filter(cp => cp.name == carparkName)[0];
  getAndDisplayPrediction();
  changeMap();
});
$('#weather-form input, #events-form input').change(() => {
  getAndDisplayPrediction();
});
