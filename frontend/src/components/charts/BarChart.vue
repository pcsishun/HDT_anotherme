<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props:
    {
    isCounting: Object,
    chartId: {
        type: String,
        default: 'bar-chart'
    },
    datasetIdKey: {
        type: String,
        default: 'label'
    },
    width: {
        type: Number,
        default: 200
    },
    height: {
        type: Number,
        default: 200
    },
    cssClasses: {
        default: '',
        type: String
    },
    styles: {
        type: Object,
        default: () => {}
    },
    plugins: {
        type: Object,
        default: () => {}
    }
},
data() {
    return {
        chartData: {
        labels: [ 'Angry', 'Disgust', 'Fear','Happy','Neutral','Sad','Suprise'],
        datasets: [ { data: this.isCounting } ],
  
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  mounted(){
    // console.log("this.isCounting ==> ",this.isCounting)
  }
}
</script>


<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>