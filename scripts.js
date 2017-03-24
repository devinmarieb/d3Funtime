// Welcome friends!
// below is the population dataset we're going to work with today.
var totalPopulation = "POPESTIMATE2015"
var birthrate = "RBIRTH2015"
var deathrate = "RDEATH2015"
var naturalIncreaseRate = "RNATURALINC2015"
var netMigrationRate = "RNETMIG2015"
var totalDeaths = "DEATHS2015"
var dataSet = totalPopulation
function dataCalculations(data) {
  var dataByState = _.keyBy(populationData, "NAME")
  dataByState = _.filter(dataByState, function(item){
    return item.NAME.length < 3
  })
  dataByState = _.map(dataByState, function(state){
    var stateName=state.NAME;
    return{
      state: state.NAME,
      data: state[data],
    }
  })
  console.log(dataByState)
  var max = _.maxBy(dataByState, function(state){
    return state.data
  })
  var min = _.minBy(dataByState, function(state){
    return state.data
  })
  console.log(min, max)
  var color = d3.scaleLinear()
  .domain([min.data, max.data])
  .range(["grey", "purple"])
  var colorDataByState = _.map(dataByState, function(state){
    return {
      state: state.state,
      fill: color(state.data)
    }
  })
  colorDataByState = _.keyBy(colorDataByState, 'state')
  colorDataByState = _.mapValues(colorDataByState, function(item){
    return item.fill
  })
  console.log(colorDataByState)
  var map = new Datamap({
    element: document.getElementById('container'),
    scope: 'usa',
    geographyConfig: {
      highlightFillColor: 'papayawhip',
      popupOnHover: true,
      popupTemplate: function(geography, data) {
          return `<div class="hoverinfo">
            ${geography.properties.name}
            Data: ${data.data}
            </div>`
      }
    },
    data:  _.keyBy(dataByState, 'state')
  })
  map.updateChoropleth(colorDataByState, {reset: false})
}
dataCalculations(dataSet)
function getRadioVal(form, name) {
   var val;
   // get list of radio buttons with specified name
   var radios = form.elements[name];
   // loop through list of radio buttons
   for (var i=0, len=radios.length; i<len; i++) {
       if ( radios[i].checked ) { // radio checked?
           val = radios[i].value; // if so, hold its value in val
           break; // and break out of for loop
       }
   }
   return val; // return value of checked radio or undefined if none checked
}
document.getElementById('switch-view-form').onsubmit = function(e) {
   e.preventDefault();
   // this (keyword) refers to form to which onsubmit attached
   var val = getRadioVal(this, 'view');
   // display value obtained
   switch(val){
     case 'totalpopulation':
       dataSet = totalPopulation;
       break;
    //  case 'birthrate':
    //    dataSet = birthrate;
    //    break;
     case 'deathrate':
       dataSet = deathrate;
       break;
   }
   document.getElementById('container').innerHTML = '';
   dataCalculations(dataSet)
}
