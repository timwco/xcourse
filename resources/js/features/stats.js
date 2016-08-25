import Chart from 'chart.js';

// Chart Data
import Chart1 from './chart-data/chart1';
import Chart2 from './chart-data/chart2';

// Chart Elements
const chartElem1 = document.getElementById('chart-1')
const chartElem2a = document.getElementById('chart-2a')
const chartElem2b = document.getElementById('chart-2b')

// Check for Charts Page
let chartsCont = document.getElementById('stats-container');
if (chartsCont && bsStats) {

  // Guests Per Class
  new Chart(chartElem1, {
      type: 'bar',
      data: new Chart1().data(),
      options: { legend: { display: false }}
  });  

  // Chart 2a, 2b
  chartElem2a.innerHTML = new Chart2().data().topGuests;
  chartElem2b.innerHTML = new Chart2().data().uniqueGuests;


}