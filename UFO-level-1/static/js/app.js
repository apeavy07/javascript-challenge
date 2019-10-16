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
    let { value } = d3.select('#datetime').node();
    let filteredData = tableData.filter(row => row.datetime === value);

    if (filteredData.length === 0) {
        window.alert('We regret to inform you that no sightings were reported on this date.');
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