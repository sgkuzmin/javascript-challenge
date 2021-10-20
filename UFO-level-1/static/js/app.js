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

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // Print the value to the console
  console.log(inputValue);

  // filter data to show the data only for particular date from the input
  var testdata = tableData.filter(x => x.datetime === inputValue );
  
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
