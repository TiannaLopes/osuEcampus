	
   
getCityData = function () {
    // Get JSON
let url = 'https://s3-us-west-2.amazonaws.com/cdt-web-storage/cities.json';
  fetch(url)
    .then(res => res.json())
    .then(cities =>
      document.querySelector('.table').appendChild(makeTable(cities))
)
    .catch(err => { throw err });
 }

function makeTable(cities) {
 cities = addDistanceToJson(cities);
  var table = document.createElement('table');
  table.setAttribute("id", "geoTable");
  var keys = getKeysFromArray(cities);
  table.appendChild(addHeaders());
  table.appendChild(addRows(cities, keys));
  return table;
}

function addDistanceToJson(cities) {
    let osuLat = 44.5645176;
    let osuLng = -123.2841833;
    for (let i = 0; i < cities.length; i++) {
        cities[i].distanceFromOsu = distance(cities[i].lat, cities[i].lng,osuLat,osuLng, "M");
    };
    return cities;
};


function getKeysFromArray(cities) {
  var array_of_keys = [];
  cities.forEach(function(obj){
    Object.keys(obj).forEach(function(key){
      if (!(array_of_keys.includes(key))) {
        array_of_keys.push(key);
      }
    });
  });
  return array_of_keys;
}


function addHeaders() {

    let thead = document.createElement('thead');
        let tr = document.createElement('tr');
    let th1 = createHeaderTH("City Name")
       let th2 = createHeaderTH("Latitude")
    let th3 = createHeaderTH("Logitude")
       let th4 = createHeaderTH("Distance from OSU in Miles")

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);

    thead.appendChild(tr);
    return thead;
}

createHeaderTH = function (headerName) {
   var th = document.createElement('th');
    th.textContent = headerName;
    return th
}

function addRows(json, keys) {
      var tbody = document.createElement('tbody');
  json.forEach(function(object){
      let tr = document.createElement('tr');
    keys.forEach(function(key){
      var td = document.createElement('td');
      td.textContent = object[key];
      tr.appendChild(td);
    });
      tbody.appendChild(tr);
  });
    return tbody;
}



// sort = function () {
//   // homes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
// const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

// const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
//     v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
// )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
  
//   document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
//     const table = th.closest('table');
//     const tbody = table.querySelector('tbody');
//     Array.from(tbody.querySelectorAll('tr'))
//       .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
//       .forEach(tr => tbody.appendChild(tr));
//   })))
// };


  function sortAsc() {
  var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("geoTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      if (Math.round(x.innerHTML) > Math.round(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  }
  function sortDesc() {
  var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("geoTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      if (Math.round(x.innerHTML) < Math.round(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
		return dist;
  }
  

}