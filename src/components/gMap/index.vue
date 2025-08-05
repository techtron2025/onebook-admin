<template>
    <div id="map"></div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import {onMounted, ref} from 'vue'

// 先挂载秘钥
window._AMapSecurityConfig = {
    securityJsCode: '28991d28c5e1f9229e6fd5721c87e5fc',
}
const props = defineProps(['info'])

onMounted(() => {
    initMap()
})

//点标记显示内容
const markerContent = `<div  class="red">
                          <img style='with:40px;height:40px' src='/public/dian.png' />
                       </div>`

const initMap = () => {
    AMapLoader.load({
        key: '1012692032f1ab275c7a5d07a9de8dd5', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
        .then((AMap) => {
            let map = new AMap.Map('map', {
                viewMode: '2D', //设置地图模式
                zoom: 16, // 初始化地图级别
                center: [props.info.longitude, props.info.latitude], // 初始化地图中心点位置
            })

            //异步加载控件
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation'], function () {
                // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                map.addControl(new AMap.ToolBar())

                // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                map.addControl(new AMap.Scale())

                // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                map.addControl(new AMap.Geolocation())
            })

            //  拥堵热力图
            const traffic = new AMap.TileLayer.Traffic({
                autoRefresh: true, //是否自动刷新，默认为false
                interval: 180, //刷新间隔，默认180s
            })
            map.add(traffic) //通过add方法添加图层

            //添加标记点
            const position = new AMap.LngLat(props.info.longitude, props.info.latitude) //Marker 经纬度
            const marker = new AMap.Marker({
                position: position,
                content: markerContent, //将 html 传给 content
                title: props.info.companyName,
                draggable: false,
                label: {
                    content: props.info.companyName,
                },
                offset: new AMap.Pixel(-13, -30), //以 icon 的 [center bottom] 为原点
            })

            map.add(marker)
        })
        .catch((e) => {
            console.log(e, '123')
        })
}
</script>

<style lang="scss" scoped>
#map {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
