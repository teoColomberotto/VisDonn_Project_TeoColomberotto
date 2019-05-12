//Imports
import * as d3 from "d3";

// Graph dimension global variables
var margin = {top: 30, right: 50, bottom: 50, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;

//SVG object append
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
var data = require('../dist/csvjson.json'); //with path
console.log(data);

//--- Function to display the graph --- //
function displayGraph(data) {
  
  //Add X axis
  var x = d3.scaleLinear()
    .domain([100, 600])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  //Text label X axis
  svg.append("text")             
  .attr("transform",
        "translate(" + (width/2 + 150) + " ," + 
        (height + margin.top -40) + ")")
  .style("text-anchor", "right")
  .text("Average length of all published tracks (sec)");   
  //Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 600])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  //Text label Y axis
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x",0 - (height / 2) + 45)
    .attr("dy", "1em")
    .style("text-anchor", "right")
    .text("Number of published tracks");      

  //Add circles scales
  var z = d3.scaleLinear()
    .domain([200000, 40000000])
    .range([ 4, 40]);

  //Add circles color
  var myColor = d3.scaleOrdinal()
    .domain(["Rock", "Pop", "Rap-HipHop", "Electronic", "Classical"])
    .range(d3.schemeSet2);

   //Tooltip setup
   var tooltip = d3.select("#my_dataviz")
   .append("div")
     .style("opacity", 0)
     .attr("class", "tooltip")
     .style("border-radius", "25px")
     .style("padding", "10px")
     .style("color", "Black")

  //Tootltips functions 
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html(d.name +" , " + "Listeners: " + d.listeners)
      .style("background-color", myColor(d.genre))
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }  
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  //Hover functiond
  var highlight = function(d){
    //reduce opacity of all groups
    d3.selectAll(".circles").style("opacity", .05)
    //expect the one that is hovered
    d3.selectAll("."+d).style("opacity", 1)
  }
                
  //And when it is not hovered anymore
    var noHighlight = function(d){
    d3.selectAll(".circles").style("opacity", 0.7)
  }
  
  //Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "circles " + d.genre})
      .attr("cx", function (d) { return x(d.averageTemps); } )
      .attr("cy", function (d) { return y(d.nbSongs); } )
      .attr("r", function (d) { return z(d.listeners); } )
      .style("fill", function (d) { return myColor(d.genre); } )
      .style("opacity", "0.7")
      .attr("stroke", "white")
      .style("stroke-width", "2px")
    //Trigger the functions
      .on("mouseover", showTooltip )
      .on("mousemove", moveTooltip )
      .on("mouseleave", hideTooltip )

  //Add one dot in the legend for each name.
  var size = 20
  var allgroups = ["Rock", "Pop", "Rap-HipHop", "Electronic", "Classical"]
  svg.selectAll("myrect")
    .data(allgroups)
    .enter()
    .append("circle")
      .attr("cx", 890)
      .attr("cy", function(d,i){ return 280 + i*(size+15)})
      .attr("r", 15)
      .style("fill", function(d){ return myColor(d)})
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)
    
  //Add labels beside legend dots
  svg.selectAll("mylabels")
    .data(allgroups)
    .enter()
    .append("text")
      .attr("x", 850 + size*.8)
      .attr("y", function(d,i){ return i * (size + 15) + (size/2 + 270)}) 
      .style("fill", function(d){ return myColor(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "end")
      .style("alignment-baseline", "middle")
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)

  };

//Call function to display graph
displayGraph(data);
