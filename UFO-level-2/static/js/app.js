// from data.js
var tableData = data;

// Select the button
var button = d3.select("#filter-btn");


// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);

// Create the function to run event
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input elements for date(s), cities, states, countries and shapes and get the raw HTML code
  var inputElement = d3.select("#datetime");

  var inputElementCity = d3.select("#city1");

  var inputElementState = d3.select("#state1");

  var inputElementCountry = d3.select("#country1");

  var inputElementShape = d3.select("#shape1");

  // Get the value property for each  input element
  var inputValue = inputElement.property("value");
  var inputValueCity = inputElementCity.property("value");
  var inputValueState = inputElementState.property("value");
  var inputValueCountry = inputElementCountry.property("value");
  var inputValueShape = inputElementShape.property("value");
  
  //parse cities, states, countries and shapes into arrays of strings 
  var cities = getNames(inputValueCity);
  var states = getNames(inputValueState);
  var countries = getNames(inputValueCountry);
  var shapes = getNames(inputValueShape);

// get date(s) from the input string
  var date1 = getDates( inputValue ).startDate;
  var date2 = getDates( inputValue ).endDate;

// print dates to console
  console.log(date1);
  console.log(date2);



  // filter data to show the data only for particular date(s) cities, states, countries and shapes
  // if the field is empty, then it is not filtered upon (except date(s), date must be always present )
  

  if (date2 != null ) {   // This cais is for only when date range is entered
  var testdata = tableData.filter( x => new Date(x.datetime) <= date2 && 
    new Date(x.datetime) >= date1 && (cities.length==0 || cities.includes( x.city )) && 
      (states.length==0 || states.includes( x.state )) && 
        (countries.length==0 || countries.includes( x.country )) && 
          (shapes.length==0 || shapes.includes( x.shape )) ) ; }
  else {  // This case is for only one date entered
    var testdata = tableData.filter(x => new Date(x.datetime).getTime() === date1.getTime() && 
      (cities.length==0 || cities.includes( x.city )) && (states.length==0 || states.includes( x.state )) && 
        (countries.length==0 || countries.includes( x.country )) && 
        (shapes.length==0 || shapes.includes( x.shape )) );
    
  }
  
// get table body html element
  var tbody = d3.select("#ufo_table_body")

// clear table if there are rows there already
  var rows1 = tbody.selectAll('tr');
  rows1.remove();
// fill table with rows from filtered data
  testdata.forEach((ufoSight) => {
    var row = tbody.append("tr");
    Object.entries(ufoSight).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

}

// function to parse start and end dates from date range string
function getDates( dateStr ){
  var re = /\s*(?:to|$)\s*/;
  var dates = dateStr.split(re);
  var start = new Date( dates[0] );
  if (dates.length >1 ) {
  var end   = new Date( dates[1] ); } else {var end= null; }

  return{ startDate: start, endDate: end };
}

// function to parse coma separated words to an array of strings
function getNames( cityStr) {
  var cityStr_lower=cityStr.toLowerCase();
  var re = /\s*(?:,|$)\s*/;
  var cities = cityStr_lower.split(re);
  return cities;
}