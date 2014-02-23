var data; // a global

var username = window.location.pathname;
//console.log(username.slice(11));


d3.json("/campsiteData.json", function(error, json) {

  if (error)  console.log(error);
    data = json.campsiteData;
  
  
  





var w = 900;
var h = 450;
var margin = 20;

var ymax = 13000;
var xmax = 300;

y = d3.scale.linear().domain([0, ymax]).range([0 + margin, h - margin]),
x = d3.scale.linear().domain([0, xmax]).range([0 + margin, w - margin])
$("#chart").append("<div class='infobox' style='display:none;'>Test</div>");
 

var vis = d3.select(".lead")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
 
var g = vis.append("svg:g")
    .attr("transform", "translate(100,500)");

var line = d3.svg.line()
    .x(function(d,i) { return x(d.milesFromSouth) })
    .y(function(d) { return -1 * y(d.elevation); })


g.append("svg:path").attr("d", line(data));

g.append("svg:line")
    .attr("x1", x(0))
    .attr("y1", -1 * y(0))
    .attr("x2", x(xmax))
    .attr("y2", -1 * y(0))
 
g.append("svg:line")
    .attr("x1", x(0))
    .attr("y1", -1 * y(0))
    .attr("x2", x(0))
    .attr("y2", -1 * y(ymax))

g.selectAll(".xLabel")
    .data(x.ticks(5))
    .enter().append("svg:text")
    .attr("class", "xLabel")
    .text(String)
    .attr("x", function(d) { return x(d) })
    .attr("y", 0)
    .attr("text-anchor", "middle")
 
g.selectAll(".yLabel")
    .data(y.ticks(2))
    .enter().append("svg:text")
    .attr("class", "yLabel")
    .text(String)
    .attr("x", 0)
    .attr("y", function(d) { return -1 * y(d) })
    .attr("text-anchor", "right")
    .attr("dy", 2)

g.selectAll(".xTicks")
    .data(x.ticks(5))
    .enter().append("svg:line")
    .attr("class", "xTicks")
    .attr("x1", function(d) { return x(d); })
    .attr("y1", -1 * y(0))
    .attr("x2", function(d) { return x(d); })
    .attr("y2", -1 * y(-0.3))
 
g.selectAll(".yTicks")
    .data(y.ticks(4))
    .enter().append("svg:line")
    .attr("class", "yTicks")
    .attr("y1", function(d) { return -1 * y(d); })
    .attr("x1", x(-0.3))
    .attr("y2", function(d) { return -1 * y(d); })
    .attr("x2", x(0))



function xx(d) { return x(d.milesFromSouth); };
function yy(d) { return -1 * y(d.elevation); };
console.log("all colored blue");
 g
 .selectAll("circle")
 .data(data)
 .enter().append("circle")
 .attr("fill", "steelblue")
 .attr("r", 5)
 .attr("cx", xx)
 .attr("cy", yy)
 .on("mouseover", function(d) { showData(this, d.campsiteName);})
 .on("mouseclick", function(d) {console.log(d.campsiteName);})
 .on("mouseout", function(){ hideData();});

  // Visited campsites
  var url = ""+username+"/userCampsite";
  d3.json(url, function(error, json){
      if (error)  console.log(error);
     // console.log("user itinerary = ", json); 
      // json has user itinerary campsiteName
      // data has all campsiteName
      var results = [];
      for(var i = 0; i < json.length; i++){
        for(var j = 0; j < data.length; j++) {
          if(data[j].campsiteName === json[i]){
            results.push(data[j]);
          }
        }
      }
     // console.log(results);
     //console.log(g);
     console.log("some colored black");
    g
     .selectAll("circle")
     .data(results)
     .enter().append("circle")
     .attr("fill", "black")
     .attr("r", 5)
     .attr("cx", xx)
     .attr("cy", yy)
     .on("mouseover", function(d) { showData(this, d.campsiteName);})
     .on("mouseclick", function(d) {console.log(d.campsiteName);})
     .on("mouseout", function(){ hideData();});


  });

  

 
 g.append("svg:path").attr("d", line(data));
 g.append("svg:text")
 .attr("x", -200)
 .attr("y", -90)
 .attr("dy", ".1em")
 .attr("transform", "rotate(-90)")
 .text("Elevation");
 

function showData(obj, d) {
 var coord = d3.mouse(obj);
 var infobox = d3.select(".infobox");
 // now we just position the infobox roughly where our mouse is
 console.log(" coord = ", coord[0], coord[1]);
 infobox.style("left", (coord[0] + 100) + "px" );
 infobox.style("top", (coord[1] - 175) + "px");
 $(".infobox").html("hello info");
 $(".infobox").show();
 }
 
function hideData() {
 $(".infobox").hide();
 }



});

