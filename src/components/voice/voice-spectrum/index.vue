<template>
    <div class="echarts-box">
        <div class="spectrum-form" id="spectrum-form"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";


onMounted(() => {
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let data = [[0,21]];
    for (let i = 1; i < 3600; i++) {
        data.push([i*0.1,(Math.random() + 0.1) * 300 ]);
        // let now = new Date((base += oneDay));
        // data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
    }
    init(data);


});


function init(data){
    let option = {
        title: {
            left: 'center',
            text: '频谱'
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: '0'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'value',
            boundaryGap: false,
            name: '秒',
            interval: 8,
            rotate: 45,
            max: 360
        },
        yAxis: {
            name: 'uPa',
            type: 'value',
            boundaryGap: [0,'100%']
        },
        dataZoom: [{
            type: 'inside',
            start:0,
            end:100
        }, {
            start:0,
            end:100
        }],
        series: [{
            type: 'line',
            smooth: false,
            data: data,
            symbol:'none',
            // areaStyle:{},
        }],
        grid:{
            left:50,
            top:50,
            right:50,
            bottom:100
        }
    };


    let chartDom = document.getElementById("spectrum-form");
    if (chartDom) {
        let myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
        window.addEventListener("resize", () => {
            // 执行echarts自带的resize方法，即可做到让echarts图表自适应
            myChart.resize();
        });
    };

}
</script>
<style lang='less' scoped>
.echarts-box {
  display: flex;
  align-items: center;
  justify-content: center;
  .spectrum-form {
    width: 5000px;
    height: 300px;
    background: #fff;
  }
}
</style>
