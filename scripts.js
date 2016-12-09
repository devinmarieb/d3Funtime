
var map = new Datamap({
    element: document.getElementById('container'),
    scope: 'usa',
    // fills: {
    //   defaultFill: 'green'
    // },
    geographyConfig: {
      highlightFillColor: '#f1231d',
      popupOnHover: true,
      popupTemplate: function(geography, data){
        return '<div class="hoverinfo">'+geography.properties+'</div>'
      }
    },
  });

// function data(){
//   return {
//     CA:
//       fill: "rgb(70, 130, 180)",
//     },
//     NY: {
//       fillKey:
//           "rgb(159, 47, 51)",
//     },
//     NJ: {
//       fillKey: 'MEDIUM',
//     },
//     CO: {
//       fillKey: 'HIGH',
//     }
//   }
// }

const dataSet = "POPESTIMATE2015"

var dataByState = _.keyBy(populationData, "NAME");

dataByState = _.filter(dataByState, function(item){
  return item.NAME.length < 3
})

var populationEst2015 = _.map(dataByState, function(state){
  var stateName=state.NAME;
  return {
    state: state.NAME,
    data: state[dataSet],
  }
});

var max = _.maxBy(populationEst2015, function(object){
  return object.data
});

var min = _.minBy(populationEst2015, function(object){
  return object.data
});

console.log(max.data, min.data);
//
var color = d3.scaleLinear()
    .domain([min.data, max.data])
    .range(["lightGreen", "green"]);

var popByState = _.keyBy(populationEst2015, "state");

console.log(popByState);

console.log(color(popByState.AK.data))

var colorDataByState = _.map(popByState, function(item){
  return {
    state: item.state,
    fill: color(item.data)
  }
})

console.log(colorDataByState);

colorDataByState = _.keyBy(colorDataByState, "state")

var mapData = _.mapValues(colorDataByState, function(item){
  return item.fill
});

map.updateChoropleth(mapData);
