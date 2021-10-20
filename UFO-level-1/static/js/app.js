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

  var testdata = tableData.filter(x => x.datetime === inputValue );
  filltable(testdata, ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments' ]);

}

// function to fill existing table with with data
function filltable(data, columns) {

  //select table body to work with
  var tbody = d3.select("#ufo_table_body")
  // if there are rows already in a table, clear them
  var rows1 = tbody.selectAll('tr');
  rows1.remove();

  // create rows 
  var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

  // create cells in each row
  var cells = rows.selectAll('td')
    .data(function (row) {
      return columns.map(function (column) {
        return {column: column, value: row[column]};
      });
    })
    .enter()
    .append('td')
      .text(function (d) { return d.value; });

return tbody;
}