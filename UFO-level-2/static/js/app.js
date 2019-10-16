// from data.js
var tableData = data;

/******************************
* Loading DOM Elements
******************************/

let tableBody = d3.select('#ufo-table').select('tbody');
let filterButton = d3.select('#filter-btn');

/******************************
* Event Listeners
******************************/

filterButton.on('click', function() {
    let dateTimeValue = d3.select('#datetime').node().value;
    let cityValue = d3.select('#city').node().value;
    let stateValue = d3.select('#state').node().value;
    let countryValue = d3.select('#country').node().value;
    let shapeValue = d3.select('#shape').node().value;
    let dynCon = null;

    if (dateTimeValue) {
        dynCon = 'row.datetime === dateTimeValue';
    }

    if (dateTimeValue && cityValue) {
        dynCon += ' && row.city === cityValue';
    }
    else if (cityValue) {
        dynCon = 'row.city === cityValue';
    }

    if ((dateTimeValue || cityValue) && stateValue) {
        dynCon += ' && row.state === stateValue';
    }
    else if (stateValue) {
        dynCon = 'row.state === stateValue';
    }

    if ((dateTimeValue || cityValue || stateValue) && countryValue) {
        dynCon += ' && row.country === countryValue';
    }
    else if (countryValue) {
        dynCon = 'row.country === countryValue';
    }

    if ((dateTimeValue || cityValue || stateValue || countryValue) && shapeValue ) {
        dynCon += ' && row.shape === shapeValue';
    }
    else if (shapeValue) {
        dynCon = 'row.shape === shapeValue';
    } 
    
    let filteredData = tableData.filter(row => eval(dynCon));

    if (filteredData.length === 0) {
        window.alert('We regret to inform you that no sightings matched your search criteria.');
        return;
    }
    else {
        let rowSelection = tableBody.selectAll('tr').data(filteredData);

        // Enter, Update...
    
        rowSelection.enter()
        .append('tr')
        .merge(rowSelection)
        .html(data => {
            return `<td>${data.datetime}</td> <td>${data.city}</td> <td>${data.state}</td>
            <td>${data.country}</td> <td>${data.shape}</td> <td>${data.durationMinutes}</td> 
            <td>${data.comments}</td>`;
        });
    
        // And Exit
    
        rowSelection.exit().remove();
    }
});

/******************************
* Init
******************************/

(_ => {
    let rowSelection = tableBody.selectAll('tr').data(tableData);
    rowSelection.enter()
    .append('tr')
    .html(data => {
        return `<td>${data.datetime}</td> <td>${data.city}</td> <td>${data.state}</td>
        <td>${data.country}</td> <td>${data.shape}</td> <td>${data.durationMinutes}</td> 
        <td>${data.comments}</td>`;
    });
})();