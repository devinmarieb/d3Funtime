const birthrate = "RBIRTH2015"
const deathrate = "RDEATH2015"
const naturalIncreaseRate = "RNATURALINC2015"
const netMigrationRate = "RNETMIG2015"
const totalDeaths = "DEATHS2015"

const dataSet = birthrate;

console.log(populationData);
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

var color = d3.scaleLinear()
    .domain([min.data, max.data])
    .range(["white", "darkGreen"]);

var popByState = _.keyBy(populationEst2015, "state");

var colorDataByState = _.map(popByState, function(item){
  return {
    state: item.state,
    fill: color(item.data)
  }
})

colorDataByState = _.keyBy(colorDataByState, "state")

var mapColorData = _.mapValues(colorDataByState, function(item){
  return item.fill
});

console.log(popByState);

var map = new Datamap({
    element: document.getElementById('container'),
    scope: 'usa',
    geographyConfig: {
      highlightFillColor: 'purple',
      popupOnHover: true,
      popupTemplate: function(geography, data){
        console.log(geography);
        console.log(data);
        return `<div class="hoverinfo">
                  ${geography.properties.name}
                  Data: ${data.data}
                </div>`
      },
    },
    data: popByState,
  });

map.updateChoropleth(mapColorData, {reset: false});
