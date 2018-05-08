<template>
    <div>
        <input type="checkbox" v-model="value" v-on:change="onChanged" />
        <span>{{caption}}</span>
    </div>
</template>

<script>
export default {
    name: 'CheckBox',
    props: ['startValue', 'caption'],
    data () {
        return {
            value: this.startValue
        }
    },
    methods: {
        onChanged: function () {
            // console.log('onChanged() this.value=', this.value)
            this.$emit('checkbox-changed', this.value)
        }
    }
}

</script>

<style scoped>
</style>
