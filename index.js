$(function() {
  $('#datetimepicker').datetimepicker();
});

function changeCarpark() {
  let modelResult = 75;
  var carpark = document.getElementById('carpark-select').value;
  document.getElementById('output').innerHTML =
    "We think it's likely that " + carpark + ' is ' + modelResult + ' % full';
}
