<template>
    <div class="settingsPage">
        <h1>Настройки игры</h1>
        <p>
            Добро пожаловать на {{day}} тренировочный день! <br>Ваш последний результат - решено
            {{lastSolved}} из {{lastTotal}}. Общая точность {{accuracy}}%
        </p>

        <div class="settings">
            <slider min="1" max="15" :startValue="length" caption1="Длительность" caption2="минут" v-on:slider-changed="onParamChanged('length', $event)"></slider>
            <slider min="1" max="10" :startValue="difficulty" caption1="Сложность" caption2="" v-on:slider-changed="onParamChanged('difficulty', $event)"></slider>
            <check-box  caption="Суммирование"          :startValue="sum" v-on:checkbox-changed="onParamChanged('sum', $event)"></check-box>
            <check-box  caption="Разность"              :startValue="sub" v-on:checkbox-changed="onParamChanged('sub', $event)"></check-box>
            <check-box  caption="Умножение"             :startValue="mul" v-on:checkbox-changed="onParamChanged('mul', $event)"></check-box>
            <check-box  caption="Деление"               :startValue="div" v-on:checkbox-changed="onParamChanged('div', $event)"></check-box>
            <check-box  caption="Возведение в степень"  :startValue="pwr" v-on:checkbox-changed="onParamChanged('pwr', $event)"></check-box>

            <div class="btPlay">
                <input type="button" value="Играть"  v-on:click="play" />
            </div>

        </div>

    </div>
</template>

<script>
import Slider from './Slider.vue'
import CheckBox from './CheckBox.vue'
import AppMenu from './Menu.vue'

export default {
    name: 'Settings',
    data () {
        return {
            msg: 'SETTINGS',
            length: 6,
            difficulty: 5,
            sum: false,
            sub: false,
            mul: false,
            div: false,
            pwr: false,
            day: 23,
            lastSolved: 10,
            lastTotal: 25,
            accuracy: 80
        }
    },
    methods: {
        play: function () {
            this.$router.push('/game/')
        },
        onParamChanged: function (paramName, val) {
            console.log('onParamChanged()! paramName=', paramName, ' val=', val)
            this[paramName] = val
        }
    },
    components: {
        Slider,
        CheckBox,
        AppMenu
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    h1, h3 {
        text-align: center;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }

    .settingsPage {
        width: 400px;
        border: 1px solid blue;
    }

    nav {
        text-align: center;

    }

    .settings {
        width: 200px;
        margin: 0 auto;
    }

    .btPlay {
        margin: 20px 0px 0px 0px;
    }

</style>
