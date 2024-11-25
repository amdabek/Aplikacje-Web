var products = [];

function fetchData() {
  fetch("https://dummyjson.com/products")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      products = data.products.slice(0, 30);
      displayData(products);
    })
    .catch(function (error) {
      console.error("Błąd podczas pobierania danych:", error);
    });
}

function displayData(data) {
  var container = document.getElementById("tableContainer");
  container.innerHTML = "";

  var table = document.createElement("table");

  //naglowki
  var headerRow = document.createElement("tr");
  var headers = ["Zdjęcie", "Tytuł", "Opis"];
  for (var i = 0; i < headers.length; i++) {
    var header = document.createElement("th");
    header.textContent = headers[i];
    headerRow.appendChild(header);
  }
  table.appendChild(headerRow);

  //wiersze
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    var row = document.createElement("tr");

    var imgCell = document.createElement("td");
    var img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    var titleCell = document.createElement("td");
    titleCell.textContent = product.title;
    row.appendChild(titleCell);

    var descCell = document.createElement("td");
    descCell.textContent = product.description;
    row.appendChild(descCell);

    table.appendChild(row);
  }

  container.appendChild(table);
}

function filterAndSortData() {
  var filterValue = document.getElementById("filterInput").value.toLowerCase();
  var sortValue = document.getElementById("sortSelect").value;

  var filteredData = [];
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (
      product.title.toLowerCase().indexOf(filterValue) !== -1 ||
      product.description.toLowerCase().indexOf(filterValue) !== -1
    ) {
      filteredData.push(product);
    }
  }

  if (sortValue === "asc") {
    filteredData.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  } else if (sortValue === "desc") {
    filteredData.sort(function (a, b) {
      return b.title.localeCompare(a.title);
    });
  }

  displayData(filteredData);
}

document
  .getElementById("filterInput")
  .addEventListener("input", filterAndSortData);
document
  .getElementById("sortSelect")
  .addEventListener("change", filterAndSortData);

fetchData();
