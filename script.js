var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["empCode"] = document.getElementById("empCode").value;
    formData["empName"] = document.getElementById("empName").value;
    formData["empEmail"] = document.getElementById("empEmail").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["address"] = document.getElementById("address").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("empList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.empCode;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.empName;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.empEmail;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.phone;
    cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.address;
    cell5= newRow.insertCell(5);
        cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;



  // Save to localStorage

    let records = JSON.parse(localStorage.getItem('records')) || [];
    records.push(data);
    localStorage.setItem('records', JSON.stringify(records));
}

// Function to load records from localStorage
function loadRecords() {
    let records = JSON.parse(localStorage.getItem('records')) || [];
    var table = document.getElementById("empList").getElementsByTagName('tbody')[0];
    
    records.forEach(function(data) {
        var newRow = table.insertRow(table.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        
        cell1.innerHTML = data.empCode;
        cell2.innerHTML = data.empName;
        cell3.innerHTML = data.empEmail;
        cell4.innerHTML = data.phone;
        cell5.innerHTML = data.address;
        cell6.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
    });
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("empCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("empEmail").value = selectedRow.cells[2].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
    document.getElementById("address").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.empCode;
    selectedRow.cells[1].innerHTML = formData.empName;
    selectedRow.cells[2].innerHTML = formData.empEmail;
    selectedRow.cells[3].innerHTML = formData.phone;
    selectedRow.cells[4].innerHTML = formData.address;
}


//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('empList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("empCode").value = '';
    document.getElementById("empName").value = '';
    document.getElementById("empEmail").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("address").value = '';
    selectedRow = null;
}
