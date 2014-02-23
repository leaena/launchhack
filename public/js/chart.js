var data; // a global

var username = window.location.pathname;

d3.json("/campsiteData.json", function(error, json) {

  if (error)  console.log(error);
    data = json.campsiteData;

  var url = ""+username+"/userCampsite";
  d3.json(url, function(error, json){
      if (error)  console.log(error);

      for(var i = 0; i < json.length; i++){
        for(var j = 0; j < data.length; j++) {
          if(data[j].campsiteName === json[i]){
            data[j].visited = true;
          }
        }
      }

    var w = 960;
    var h = 410;
    var margin = 30;


    var ymin = 3000;
    var ymax = 13000;
    var xmax = 300;

    y = d3.scale.linear().domain([0, ymax]).range([0 + margin, h - margin]),
    x = d3.scale.linear().domain([0, xmax]).range([0 + margin, w - margin])

var vis = d3.select(".lead")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)

var g = vis.append("svg:g")
    .attr("transform", "translate(100,500)");

var line = d3.svg.line()
    .x(function(d,i) { return x(d.milesFromSouth) })
    .y(function(d) { return -1 * y(d.elevation); });

g.append("svg:path").attr("d", line(data));

function xx(d) { return x(d.milesFromSouth); };
function yy(d) { return -1 * y(d.elevation); };
function texty(d) { return (-1 * y(d.elevation)) -30; };

 var points = g
 .selectAll("circle")
 .data(data)
 .enter();

 points.append("circle")
 .attr("fill", function(d) {
    if(d.visited)  {
      return "red";
    }
    return "steelblue";
 })
 .attr("fill-opacity", 100)
 .attr("r", function(d){
    if (d.visited) return 10;
    return 5;})
 .attr("cx", xx)
 .attr("cy", yy);

points.append("text")
      .attr("class", "linktext")
      .style("backround-color", "white")
      .attr("dx", xx)
      .attr("dy", texty )
      .style("text-anchor", "middle")
      .style({opacity: '0'})
      .text(function(d){
        if(d.visited) return d.campsiteName
        return ""
    })
    .on("mouseover", function() {
        d3.select(this).style({opacity: '0.8', 'font-size': '20px'});
    })
    .on("mouseout", function(){
        d3.select(this).style({opacity: '0.0'});
    });

});
});
