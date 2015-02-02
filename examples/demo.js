var Chromosome = require('cyto-chromosome');

var c13 = new Chromosome({
  target: "#demo",
  segment: "13",
  includeAxis: true
}).draw();

c13.on('modelLoaded', function(e) {
  $('#info').text("on modelLoaded");
});

c13.on('bandSelection', function(e) {
  //console.log(e);
  $("#info").text("on bandSelection " + "band: " + e.bandID + " start: " + e.start + " stop: " + e.end);

});

c13.on('selectionChanged', function(e) {
  $("#info").text("on selectionChanged " + " start: " + e.start + " stop: " + e.end);
});

$("#btn").on('click', function() {
  var start = $("#from").val();
  var end = $("#to").val();
  c13.moveSelectorTo(start, end);

});

$("#btn2").on('click', function() {

  var start = c13.getCoordsByBand($("#fromBand").val())[0];
  var end = c13.getCoordsByBand($("#toBand").val())[1];
  console.log(start + " " + end);
  c13.moveSelectorTo(start, end);

});

var c22 = new Chromosome({
  target: "#demo2",
  segment: "22",
  includeAxis: true,
  selectionMode: "multi"
}).draw();
