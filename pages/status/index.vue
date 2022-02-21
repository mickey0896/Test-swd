<script>
import { Line } from "vue-chartjs";
import axios  from "axios"

export default {
    layout: 'coreLayout',
     auth: false,
  extends: Line,
  
  mounted() {
    
    const URL = "https://swdapi.ddns.net:8090/data/ttntest"
      axios
        .get(URL)
        .then( res =>{
        console.log(res.data)
    const data = res.data.slice(100).map( item =>{
      return {
        timestamp:item.timestamp,data:item.data  
      }
    }) 
  this.renderChart(
      {
        labels: data.map(item => item.timestamp),
        datasets: [
          {
            label: "Data",
            data: data.map(item => item.data),
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data"
        }
      }
    );
      })
  }
};
</script>