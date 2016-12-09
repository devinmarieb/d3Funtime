
var map = new Datamap({
    element: document.getElementById('container'),
    scope: 'usa',
    fills: {
      HIGH: '#afafaf',
      LOW: '#123456',
      MEDIUM: 'blue',
      UNKNOWN: 'rgb(0,0,0)',
      defaultFill: 'green'
    },
    geographyConfig: {
      highlightFillColor: '#f1231d',
      popupOnHover: true,
      popupTemplate: function(geography, data){
        return '<div class="hoverinfo">'+geography.properties+'</div>'
      }
    },
    data:{
      NY: {
        test: 'hello',
      }
    }
  });

function data(){
  return {
    CA: {
      fillKey: 'LOW',
    },
    NY: {
      fillKey: 'LOW',
    },
    NJ: {
      fillKey: 'MEDIUM',
    },
    CO: {
      fillKey: 'HIGH',
    }
  }
}



var dataByState = _.keyBy(populationData, "NAME");


// var color = d3.scale.log()
//     .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
//     .interpolate(d3.interpolateHcl);
//
// var densities = counties
//         .map(function(d) { return d.properties.density = d.properties.pop / path.area(d); })
//         .sort(function(a, b) { return a - b; });
//
// color.domain([d3.quantile(densities, .01), d3.quantile(densities, .99)]);
//
// console.log(color(20));

map.updateChoropleth(data());
