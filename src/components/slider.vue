<template>
    <div class="f-ptb-10" style="width: 100%" v-if="sliderNum > 0 && sliderNum != 100">
        <div class="slider">
            <div class="slider-son" :style="{width: sliderNum + '%'}"></div>
        </div>
        <div class="f-mt-10">图片上传中。。（{{ sliderNum }}%）</div>
    </div>
</template>

<script setup>
defineProps(['sliderNum'])
</script>

<style lang="scss" scoped>
.slider {
    position: relative;
    width: 100%;
    height: 3px;
    background-color: gray;
}
.slider-son {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 3px;
    background-color: #067ff8;
}
</style>
