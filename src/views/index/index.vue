<template>
  <div class="page">
    <table>
      <caption @click="router.push({name: 'Covid19'})">商品列表</caption>
      <thead>
        <tr>
          <th>商品名称</th>
          <th>价格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          :key="item.id"
        >
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td><button @click="toDetail(item.id)">详情</button></td>
        </tr>
      </tbody>
    </table>

    <div id="main"></div>
  </div>

</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { data } from '../../assets/list.json'
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const router = useRouter()
type Shop = {
  id: number;
  name: string;
  price: number;
}


const toDetail = (id: number) => {
  router.push({
    name: 'Detail',
    params: {
      id
    }
  })
}


// 数据
const chartData = [
  {
    value: 590,
    name: 'A',
  },
  {
    value: 410,
    name: 'B',
  },
];
const colorList = [
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: '#FF3205',
    },
    {
      offset: 1,
      color: '#FFD422',
    },
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: '#1152FD',
    },
    {
      offset: 1,
      color: '#A7E5FF',
    },
  ]),
];
const sum = chartData.reduce((per, cur) => per + cur.value, 0);
const gap = (1 * sum) / 100;
const pieData1 = [];
const gapData = {
  name: '',
  value: gap,
  itemStyle: {
    color: 'transparent',
  },
};
for (let i = 0; i < chartData.length; i++) {
  pieData1.push({
    ...chartData[i],
    itemStyle: {
      borderRadius: 100,
    },
  });
  pieData1.push(gapData);
}
// 配置项
const option = {
  title: [{
    text: '41%',
    x: '50%',
    y: '52%',
    textAlign: 'center',
    textStyle: {
      fontSize: '28',
      fontWeight: '600',
      color: '#5c5a68',
      textAlign: 'center',
    },
  }, {
    text: '2022年12月\n碳排放占比',
    left: '49.7%',
    top: '36%',
    textAlign: 'center',
    textStyle: {
      fontSize: '16',
      fontWeight: '400',
      color: '#98b5d2',
      textAlign: 'center',
    },
  },],
  color: colorList,
  series: [
    {
      type: 'pie',
      z: 3,
      roundCap: true,
      radius: ['44%', '51%'],
      center: ['50%', '50%'],
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: pieData1,
    }
  ],
};

onMounted(() => {
  const myChart = echarts.init(document.getElementById('main') as HTMLElement);
  // 绘制图表
  myChart.setOption(option);
})
</script>

<style lang="less" scoped>
@e: #dedede;

table {
  width: 400px;
  margin: 0 auto;
  text-align: center;
  border-collapse: collapse;

  caption {
    margin: 10px 0;
    font-weight: bold;
    font-size: 20px;
  }

  th,
  td {
    height: 30px;
    padding: 4px;
    border: 1px solid @e;
  }
}

#main {
  height: 300px;
}
</style>