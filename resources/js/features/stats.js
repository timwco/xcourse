import Chart from 'chart.js';

// Chart Data
import chart1 from './chart-data/chart1';
import chart2 from './chart-data/chart2';

// Chart Elements
const chartElem1 = document.getElementById('chart-1')
const chartElem2a = document.getElementById('chart-2a')
const chartElem2b = document.getElementById('chart-2b')

// Check for Charts Page
let chartsCont = document.getElementById('stats-container');
if (chartsCont) {

  // Guests Per Class
  new Chart(chartElem1, {
      type: 'bar',
      data: chart1,
      options: { legend: { display: false }}
  });  

  // Chart 2a, 2b
  chartElem2a.innerHTML = chart2.topGuests;
  chartElem2b.innerHTML = chart2.uniqueGuests;


}