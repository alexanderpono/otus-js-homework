<template>
    <div>
        <div class="captions">
            <div class="length1">{{min}}</div>
            <div class="length2">{{max}}</div>
        </div>
        <input class="range" type="range" :min="min" :max="max" step="1" v-model="value" v-on:change="onChanged"/>
        <p class="sliderCaption">{{caption1}} {{value}} {{caption2}}</p>
    </div>
</template>

<script>
export default {
    name: 'Slider',
    props: ['min', 'max', 'startValue', 'caption1', 'caption2'],
    data () {
        return {
            value: this.startValue
        }
    },
    methods: {
        onChanged: function () {
            // console.log('onChanged() this.value=', this.value)
            this.$emit('slider-changed', this.value)
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .captions {
        display:flex;
        flex-direction: row;
        width: 170px;
    }

    .length1 {
        width: 50%;
    }

    .length2 {
        width: 50%;
        text-align: right;
    }

    .range {
        width: 170px;
    }

    .sliderCaption {
        margin-bottom: 50px;
    }
</style>
