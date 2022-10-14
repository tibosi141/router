<template>
  <div class="page">
    <div
      ref="myCanvasContainer"
      id="myCanvasContainer"
    >
      <canvas
        ref="myCanvas"
        id="myCanvas"
      >
        <p>换个现代浏览器吧！</p>
      </canvas>
    </div>
    <div
      id="tags"
      v-show="false"
    >
      <a
        v-cloak
        v-for="item in tagArr"
        :key="item.id"
        href="javascript:;"
      >{{item.name}}</a>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, nextTick } from 'vue';
import TagCanvas from 'tag-canvas'
type PersonInfo = {
  createTime: string,
  id: number,
  name: string,
  no: string,
  settingId?: number
}

const myCanvas = ref<HTMLCanvasElement>()
const myCanvasContainer = ref<HTMLElement>()
const tagArr = reactive<Array<PersonInfo>>([])

const initCanvas = (updateFlag?: boolean) => {
  const options = {
    maxSpeed: 0.03, //添加最大的运动速度
    minSpeed: 0.01, //添加最小的运动速度这样就可以保证一直运动，不会停止
    initial: [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)], //初始旋转，水平和垂直为数组，这个是鼠标未进行操控时的旋转
    minBrightness: 0.2, //最远点的标签透明度(0.0-1.0)
    padding: 2, //文本周围和背景内部的空间量(以像素为单位)
    textHeight: 14, //标记文本字体的大小(以像素为单位)
    textColour: '#303133', //字体颜色设置为 null 就会继承 每个 tag 的 a 标签的字体颜色
    outlineMethod: 'colour', //鼠标指到的元素变化类型，/outline:显示边框线(有深度)，classic:显示边框线，block:改变背景颜色为边框线颜色，colour:改变颜色，颜色属性为outlineColour:'#fff'，size:改变文本大小，大小属性为outlineIncrease:20，none:不突出显示
    outlineColour: "#67C23A", //对应outlineMethod: 'colour'
    noTagsMessage: true, //当没有可用标签时，显示“无标签”而不是空白画布。
    txtOpt: true, //文本优化，将文本标签转换为图像以获得更好的性能。
    reverse: true, //运动方向与鼠标移动方向相反
    shuffleTags: true, //设置为true随机化标签的顺序
    wheelZoom: true, //使用鼠标滚轮或滚动手势可以放大和缩小云
    dragControl: true, //鼠标控制，true 则鼠标点击可以拖动，不点击没效果，false 则根据鼠标位置旋转
    freezeActive: true, //设置为 true 以在突出显示标记时暂停移动。这个必须是在 dragControl: false 才有效
    decel: 0.2, //鼠标离开画布时的减速率,设置0，鼠标离开就停止，设置1，鼠标离开还一直转
    interval: 20, //动画帧之间的间隔，以毫秒为单位，这个东西设置大了速度会变快，但是会卡，基本20是最好的
    noSelect: false,//	设置为 true 防止选择标签。
    // shadow: '#fff', //每个标签后面阴影的颜色。
    // shadowBlur: 100, //标记阴影模糊量,以像素为单位。
    // shadowOffset: [5, 0], //标记阴影的X和Y偏移量,以像素为单位。
  }

  try {
    if (updateFlag) {
      TagCanvas.Update("myCanvas")
    } else {
      // 初始化词云
      myCanvas.value!.width = myCanvasContainer.value!.offsetWidth
      myCanvas.value!.height = myCanvasContainer.value!.offsetHeight
      TagCanvas.Start('myCanvas', 'tags', options)
    }
  } catch (e) {
    myCanvasContainer.value!.innerHTML = '换个现代浏览器吧！'
  }
}

onMounted(async () => {
  await fetch('/api/setting/query')
    .then(r => r.json())
    .then(res => {
      const members: Array<PersonInfo> = res.data.members
      tagArr.push(...members)
    })

  nextTick(() => {
    initCanvas()
  })
})
</script>

<style lang="less" scoped>
#myCanvasContainer {
  height: 100%;
  text-align: center;
}
</style>