<template>
  <div class="page">
    <div class="page-left"></div>
    <div class="page-center"></div>
    <div class="page-right"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCovidStore } from '@/stores/index';
import * as Echarts from 'echarts';
import '@/assets/china';
import { geoCoordMap } from '@/assets/geoMap';

const CovidStore = useCovidStore();

onMounted(async () => {
  await CovidStore.getData();

  const city =
    CovidStore.data.diseaseh5Shelf.areaTree[0].children;
  const data = city.map(item => {
    return {
      name: item.name,
      value: geoCoordMap[item.name].concat(
        item.total.nowConfirm
      ),
    };
  });
  const chinaMap = Echarts.init(
    document.querySelector('.page-center') as HTMLElement
  );

  const option = {
    geo: {
      show: true,
      map: 'china',
      roam: 'scale',
      zoom: 0.8,
      scaleLimit: {
        //滚轮缩放的极限控制
        min: 0.5,
        max: 2,
      },
      label: {
        show: true,
        color: '#fff',
        fontSize: 14,
        fontWeight: 100,
      },
      itemStyle: {
        borderColor: 'rgba(147, 235, 248, 1)',
        borderWidth: 1,
        borderType: 'dotted',
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
            },
          ],
        },
      },
      emphasis: {
        focus: 'self',
        label: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        },
        itemStyle: {
          areaColor: '#389BB7',
          borderColor: '#00d2ff',
          borderWidth: 2,
          borderType: 'solid',
        },
      },
      select: {
        label: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        },
        itemStyle: {
          areaColor: '#409EFF',
          borderColor: '#409EFF',
          borderWidth: 2,
          borderType: 'solid',
        },
      },
    },
    series: [
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          show: true,
          color: '#fff',
        },
        roam: true,
        emphasis: {
          show: false,
          areaColor: '#2B91B7',
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: 40,
        label: {
          show: true,
          color: '#fff',
          formatter(item: any) {
            return item.value[2];
          },
        },
        data: data,
        zlevel: 1,
        emphasis: {
          focus: 'self',
          scale: 1.8,
          label: {
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        select: {
          label: {
            color: 'red',
            fontWeight: 'bold',
          },
          itemStyle: {
            color: 'yellowgreen',
          }
        },
        selectedMode: 'multiple'
      },
    ],
  };

  chinaMap.setOption(option);
});
</script>

<style lang="less" scoped>
.page {
  display: flex;
  background: linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  );

  &-left,
  &-right {
    width: 400px;
  }

  &-center {
    flex: 1;
  }
}
</style>
