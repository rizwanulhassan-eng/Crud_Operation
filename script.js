// Get data from localStorage
function getData() {
    const data = localStorage.getItem('formData');
    return data ? JSON.parse(data) : [];
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem('formData', JSON.stringify(data));
}

// Populate the table based on data
function populateTable(data = getData()) {
    const tbody = document.getElementById('dataTable').querySelector('tbody');
    tbody.innerHTML = ''; // Clear current rows

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>
                <button class="edit-btn" onclick="editData(${index})">✏️</button>
                <button class="delete-btn" onclick="deleteData(${index})">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add data from the form to the table
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const data = getData();
    data.push({ name, address, email, phone });
    saveData(data); // Save updated data to localStorage
    populateTable(); // Refresh table display

    document.getElementById('dataForm').reset(); // Clear form inputs
});

// Inline edit data
function editData(index) {
    const data = getData();
    const row = document.getElementById('dataTable').rows[index + 1]; // Adjust for header row

    row.cells[0].innerHTML = `<input type="text" value="${data[index].name}" id="edit-name-${index}">`;
    row.cells[1].innerHTML = `<input type="text" value="${data[index].address}" id="edit-address-${index}">`;
    row.cells[2].innerHTML = `<input type="email" value="${data[index].email}" id="edit-email-${index}">`;
    row.cells[3].innerHTML = `<input type="tel" value="${data[index].phone}" id="edit-phone-${index}">`;
    row.cells[4].innerHTML = `<button onclick="saveEdit(${index})">Save</button> <button onclick="populateTable()">Cancel</button>`;
}

// Save edited data
function saveEdit(index) {
    const data = getData();

    data[index] = {
        name: document.getElementById(`edit-name-${index}`).value,
        address: document.getElementById(`edit-address-${index}`).value,
        email: document.getElementById(`edit-email-${index}`).value,
        phone: document.getElementById(`edit-phone-${index}`).value
    };

    saveData(data); // Save updated data to localStorage
    populateTable(); // Refresh table display
}

// Delete data
function deleteData(index) {
    const data = getData();
    data.splice(index, 1); // Remove item at the given index
    saveData(data); // Save updated data to localStorage
    populateTable(); // Refresh table display
}

// Search data based on criteria
function searchData() {
    const searchBy = document.getElementById('searchBy').value; // Get the selected search criterion
    const searchInput = document.getElementById('searchInput').value.toLowerCase(); // Search input (case insensitive)
    const data = getData(); // Fetch data from localStorage

    // Filter data based on the selected search criterion
    const filteredData = data.filter(item => item[searchBy].toLowerCase().includes(searchInput));
    populateTable(filteredData); // Display the filtered data in the table
}

// Set up dynamic search listener
document.getElementById('searchInput').addEventListener('input', searchData);

// Populate the table on page load
populateTable();
