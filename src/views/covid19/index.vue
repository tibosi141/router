<template>
  <div class="page">
    <div class="page-left"></div>
    <div class="page-center"></div>
    <div class="page-right">
      <el-table
        :data="CovidStore.current"
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
const todayConfirmSort = (a:Children, b:Children) => {
  return a.today.confirm - b.today.confirm
}
const totalConfirmSort = (a:Children, b:Children) => {
  return a.total.confirm - b.total.confirm
}
const totalHealSort = (a:Children, b:Children) => {
  return a.total.heal - b.total.heal
}
const todayDeadSort = (a:Children, b:Children) => {
  return a.total.dead - b.total.dead
}

const initCharts = () => {
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
      state.current = e.data.children;
    });
  });
};

onMounted(async () => {
  await CovidStore.getData();
  initCharts();
});
</script>

<style lang="less" scoped>
.page {
  display: flex;
  background: linear-gradient(to right, #373b44, #4f6485, #373b44);

  &-left{
    width: 400px;
  }
  &-right {
    width: 450px;

    :deep(.el-table) {
      background-color: transparent;
      --el-table-header-bg-color: transparent;
      --el-table-border-color: #787b81;

      thead {
        tr {
          background-color: transparent;
        }
        div.cell {
          color: #79bbff;
          font-weight: bold;
        }
      }

      .cell,
      span {
        color: #fff;
      }

      .primary-row {
        background-color: transparent;
      }
      .warning-row {
        --el-table-tr-bg-color: var(--el-color-warning-light-3);
      }
      .danger-row {
        --el-table-tr-bg-color: var(--el-color-danger-light-3);
      }
    }
  }

  &-center {
    flex: 1;
  }
}
</style>
