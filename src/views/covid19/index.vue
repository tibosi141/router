<template>
  <div class="page">
    <div class="page-left">
      <div class="page-left-grid">
        <section>
          <p>
            较上日+{{ CovidStore.chinaAdd.localConfirmH5 || 0 }}
          </p>
          <p>{{ CovidStore.chinaTotal.localConfirm || 0 }}</p>
          <p>本土现有确诊</p>
        </section>
        <section>
          <p>较上日+{{ CovidStore.chinaAdd.nowConfirm || 0 }}</p>
          <p>{{ CovidStore.chinaTotal.nowConfirm || 0 }}</p>
          <p>现有确诊</p>
        </section>
        <section>
          <p>较上日+{{ CovidStore.chinaAdd.confirm || 0 }}</p>
          <p>{{ CovidStore.chinaTotal.confirm || 0 }}</p>
          <p>积累确诊</p>
        </section>
        <section>
          <p>较上日+{{ CovidStore.chinaAdd.noInfect || 0 }}</p>
          <p>{{ CovidStore.chinaTotal.noInfect || 0 }}</p>
          <p>无症状感染者</p>
        </section>
        <section>
          <p>
            较上日+{{ CovidStore.chinaAdd.importedCase || 0 }}
          </p>
          <p>{{ CovidStore.chinaTotal.importedCase || 0 }}</p>
          <p>境外输入</p>
        </section>
        <section>
          <p>较上日+{{ CovidStore.chinaAdd.dead || 0 }}</p>
          <p>{{ CovidStore.chinaTotal.dead || 0 }}</p>
          <p>积累死亡</p>
        </section>
      </div>
      <div class="page-left-pie"></div>
      <div class="page-left-line"></div>
    </div>
    <div class="page-center"></div>
    <div class="page-right">
      <el-table
        :data="CovidStore.currentData"
        size="small"
        table-layout="auto"
        :border="true"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="name"
          label="地区"
          align="center"
        />
        <el-table-column
          prop="today"
          label="当日新增"
          align="center"
          sortable
          :sort-method="todayConfirmSort"
        >
          <template #default="scope">
            {{ scope.row.today.confirm }}
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="积累确诊"
          align="center"
          sortable
          :sort-method="totalConfirmSort"
        >
          <template #default="scope">
            {{ scope.row.total.confirm }}
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="治愈"
          align="center"
          sortable
          :sort-method="totalHealSort"
        >
          <template #default="scope">
            {{ scope.row.total.heal }}
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="死亡"
          align="center"
          sortable
          :sort-method="todayDeadSort"
        >
          <template #default="scope">
            {{ scope.row.total.dead }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCovidStore } from '@/stores/index';
import * as Echarts from 'echarts';
import '@/assets/china';
import { geoCoordMap } from '@/assets/geoMap';
import type { Children } from '@/utils/types/covid19';

const CovidStore = useCovidStore();

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: Children;
  rowIndex: number;
}) => {
  if (row.today.confirm >= 10) {
    return 'danger-row';
  } else if (
    row.today.confirm > 0 &&
    row.today.confirm < 9
  ) {
    return 'warning-row';
  }
  return 'primary-row';
};
const todayConfirmSort = (a: Children, b: Children) => {
  return a.today.confirm - b.today.confirm;
};
const totalConfirmSort = (a: Children, b: Children) => {
  return a.total.confirm - b.total.confirm;
};
const totalHealSort = (a: Children, b: Children) => {
  return a.total.heal - b.total.heal;
};
const todayDeadSort = (a: Children, b: Children) => {
  return a.total.dead - b.total.dead;
};
const initMap = () => {
  const city =
    CovidStore.data.diseaseh5Shelf.areaTree[0].children;
  const data = city.map(item => {
    return {
      name: item.name,
      value: geoCoordMap[item.name].concat(
        item.total.nowConfirm
      ),
      children: item.children,
    };
  });
  const chinaMap = Echarts.init(
    document.querySelector('.page-center') as HTMLElement
  );

  chinaMap.setOption({
    geo: {
      show: true,
      map: 'china',
      roam: true,
      zoom: 0.8,
      scaleLimit: {
        min: 0.5,
        max: 2,
      },
      label: {
        show: true,
        color: '#FFFFFF',
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
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: 'bold',
        },
        itemStyle: {
          areaColor: '#7BD5E4',
          borderColor: '#00D2FF',
          borderWidth: 2,
          borderType: 'solid',
        },
      },
      select: {
        label: {
          color: '#303133',
          fontSize: 16,
          fontWeight: 'bold',
        },
        itemStyle: {
          areaColor: '#00D2FF',
          borderColor: '#00D2FF',
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
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        selectedMode: 'multiple',
        zlevel: 1,
        symbol: 'pin',
        symbolSize: 45,
        label: {
          show: true,
          color: '#FFFFFF',
          formatter(item: any) {
            return item.value[2];
          },
        },
        itemStyle: {
          color: '#409EFF',
        },
        emphasis: {
          focus: 'self',
          scale: 1.8,
          label: {
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
        select: {
          label: {
            color: '#FFFFFF',
            fontWeight: 'bold',
          },
          itemStyle: {
            color: '#E6A23C',
            borderColor: '#E6A23C',
          },
        },
        data: data,
      },
    ],
  });

  chinaMap.on('click', (e: any) => {
    console.log(e);
    CovidStore.$patch(state => {
      state.currentData = e.data.children;
    });
  });
};
const initPie = () => {
  const data = CovidStore.cityDetail.sort((a, b) => b.local_confirm_add - a.local_confirm_add).slice(0,10)
  const chinaPie = Echarts.init(
    document.querySelector('.page-left-pie') as HTMLElement
  );

  chinaPie.setOption({
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 1,
        },
        label: {
          show: true,
          color: '#fff',
        },
        emphasis: {
          label: {
            show: true,
            color: '#41b0db',
            fontSize: '16',
            fontWeight: 'bold',
          },
          itemStyle: {
            borderColor: '#41b0db',
            borderRadius: 0,
            borderWidth: 2,
          }
        },
        labelLine: {
          show: true,
        },
        data: data.map(item => {
          return {
            name: item.city,
            value: item.local_confirm_add
          }
        }),
      },
    ],
  });
};
const initLine = () => {
  const data = CovidStore.cityDetail.sort((a, b) => Number(b.local_wzz_add) - Number(a.local_wzz_add)).slice(0,5)
  const chinaPie = Echarts.init(
    document.querySelector('.page-left-line') as HTMLElement
  );

  chinaPie.setOption({
    title: {
      text: '全国前五新增无症状患者城市',
      top: '4%',
      left: 'center',
      textStyle: {
        color: '#41b0db'
      }
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      data: data.map(item => item.city)
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#41b0db',
        }
      }
    },
    series: [
      {
        data: data.map(item => item.local_wzz_add),
        type: 'line',
        smooth: true,
        label: {
          show: true,
          color: '#fff',
        },
        emphasis: {
          label: {
            color: '#e6a23c',
            fontSize: '14',
            fontWeight: 'bold',
          },
        },
      }
    ]
  });
};

onMounted(async () => {
  await CovidStore.getData();
  initMap();
  initPie();
  initLine();
});
</script>

<style lang="less" scoped>
@itemBg: #223651;
@itemColor: #41b0db;
@itemBorder: #212028;
.page {
  padding: 10px;
  display: flex;
  background: linear-gradient(
    to right,
    #373b44,
    #4f6485,
    #373b44
  );

  &-left {
    width: 400px;

    &-grid {
      color: #fff;
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;

      section {
        padding: 10px;
        text-align: center;
        background: @itemBg;
        border: 1px solid @itemBorder;

        p:nth-child(2) {
          padding: 10px 0;
          color: @itemColor;
          font-weight: bold;
        }
      }
    }

    &-pie {
      height: 350px;
      margin-top: 16px;
      background: @itemBg;
    }

    &-line {
      height: 320px;
      margin-top: 16px;
      background: @itemBg;
    }
  }
  &-right {
    width: 450px;

    :deep(.el-table) {
      background: @itemBg;
      --el-table-header-bg-color: @itemBg;
      --el-table-border-color: @itemBorder;

      thead {
        .cell {
          color: @itemColor;
          font-weight: bold;
        }
      }

      .cell {
        color: #fff;
      }

      .primary-row {
        background-color: transparent;
      }
      .warning-row {
        --el-table-tr-bg-color: @itemBg;
        .cell {
          color: #e6a23c;
        }
      }
      .danger-row {
        --el-table-tr-bg-color: @itemBg;
        .cell {
          color: #f56c6c;
        }
      }
    }
  }

  &-center {
    flex: 1;
  }
}
</style>
