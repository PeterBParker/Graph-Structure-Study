const TwoDimArrayGraph = require('./2DArray/TwoDimArrayGraph') ;
const MapGraph = require('./Map/MapGraph.js');
const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ");
const routes = [
    ['PHX', 'LAX'],
    ['PHX', 'JFK'],
    ['JFK', 'OKC'],
    ['JFK', 'HEL'],
    ['JFK', 'LOS'],
    ['MEX', 'LAX'],
    ['MEX', 'BKK'],
    ['MEX', 'LIM'],
    ['MEX', 'EZE'],
    ['LIM', 'BKK']
];

//How would I A) Represent this info as a graph of nodes and B) Use the graph to determine routes between two arbitrary airports?

//Option 1 - As a 2D array. See ./2DArray/TwoDimArrayGraph.js
var ArrayGraph = new TwoDimArrayGraph(airports, routes);
//console.log(ArrayGraph.graph);

//Option 2 - As a Map. See ./Map/MapGraph.js
var mg = new MapGraph(airports, routes);
console.log(mg.graph);
console.log(mg.findRouteBFS("BKK", "HEL"));