const $ = require("jQuery");

export const sayHello = (name) => {
  const greeting = `Hello ${name}`;
  document.getElementById("greeting").innerHTML = greeting;
};

export const loadDeputies = () => {
  const url = "data.json";
  (async () => {
    try {
      const response = await fetch(url);
      const deputies = await response.json();
      renderList(deputies);
    } catch (e) {
      alert(e);
    }
  })();
};

const renderList = (deputies) => {
  let tableItems = `<tr>
         <th>Name</th>
         <th>Gender</th>
         <th>Date of Birth</th>
         <th>Party</th>
         <th>Constituency</th>
     </tr>`;
  deputies.profiles.forEach((profile) =>
    tableItems += `<tr>
           <td>${profile.personal.first_name} ${profile.personal.last_name}</td>
           <td>${profile.personal.gender}</td>
           <td>${profile.personal.birthyear}</td>
           <td>${profile.party}</td>
           <td>${profile.constituency.name}</td>
       </tr>`);
  document.getElementById("deputies").innerHTML = tableItems;
  addClickListener();
};

const addClickListener = () => {
  $("th").click(function () {
    const table = $(this).parents("table").eq(0);
    let rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc) {
      rows = rows.reverse();
    }
    for (let i = 0; i < rows.length; i++) {
      table.append(rows[i]);
    }
  });
};

const comparer = (index) => {
  return (a, b) => {
    let valueA = getCellValue(a, index),
      valueB = getCellValue(b, index);
    return $.isNumeric(valueA) && $.isNumeric(valueB) ? valueA - valueB : valueA.localeCompare(valueB);
  };
};

const getCellValue = (row, index) => {
  return $(row).children("td").eq(index).text();
};
