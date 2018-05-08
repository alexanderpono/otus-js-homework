<template>
    <div class="gamePage">
        <h1>{{ msg }}</h1>

        <div class="topRow">
            <div class="btCancel">
                <input type="button" value="Отмена"  v-on:click="cancel" />
            </div>

            <div class="timerDiv">
                <input type="text" v-model="time" />
            </div>

        </div>

        <div class="quiz">
            <span id="num1">{{firstOperand}}</span>
            {{mathOperation1}}
            <input id="num2" type="text" v-model="answer1" />
            {{mathOperation2}}
            <input id="num3" type="text" v-model="answer2" />
            <span id="question">
                = {{supposedAnswer}}?
            </span>

        </div>

        <div class="buttons">
            <div class="numberPad">
                <div class="numberButtons">
                    <div>
                        <input type="button" value="1"  v-on:click="btNumber(1)" />
                        <input type="button" value="2"  v-on:click="btNumber(2)" />
                        <input type="button" value="3"  v-on:click="btNumber(3)" />
                    </div>
                    <div>
                        <input type="button" value="4"  v-on:click="btNumber(4)" />
                        <input type="button" value="5"  v-on:click="btNumber(5)" />
                        <input type="button" value="6"  v-on:click="btNumber(6)" />
                    </div>
                    <div>
                        <input type="button" value="7"  v-on:click="btNumber(7)" />
                        <input type="button" value="8"  v-on:click="btNumber(8)" />
                        <input type="button" value="9"  v-on:click="btNumber(9)" />
                    </div>
                    <div class="zeroButton">
                        <input type="button" value="0"  v-on:click="btNumber(0)" />
                    </div>
                </div>
                <div class="specialButtons">
                    <input type="button" value="<"  v-on:click="btLess" />
                    <input type="button" value=">"  v-on:click="btMore" />
                    <input type="button" value="?"  v-on:click="btQuestion" />
                    <input type="button" value="="  v-on:click="btEqual" />

                </div>

            </div>
        </div>

    </div>
</template>

<script>
import AppMenu from './Menu.vue'

export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Игра',
            time: '0:00',
            answer1: '',
            answer2: '',
            firstOperand: 14,
            supposedAnswer: 84241,
            mathOperation1: '*',
            mathOperation2: '+'
        }
    },
    methods: {
        cancel: function () {
            this.$router.push('/settings/')
        },
        btNumber: function (param) {
            console.log('btNumber() pressed! param=', param)
        },
        btLess: function (param) {
            console.log('btLess() pressed!')
        },
        btMore: function (param) {
            console.log('btMore() pressed!')
        },
        btQuestion: function (param) {
            console.log('btQuestion() pressed!')
        },
        btEqual: function (param) {
            console.log('btEqual() pressed!')
        }

    },
    components: {
        AppMenu
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
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
    #num2, #num3 {
        width: 3em;
    }

    #question {
        color: grey;
    }

    .topRow {
        width: 300px;
        margin: 0 auto;

        display:flex;
        flex-direction: row;
    }

    .btCancel {
        width: 50%;
        flex-grow: 0;
    }

    .timerDiv {
        width: 50%;
        flex-grow: 0;
        text-align: right;
    }

    .timerDiv input {
        width: 5em;
    }

    .gamePage {
        width: 400px;
        border: 1px solid blue;
    }

    .quiz {
        text-align: center;
        margin: 20px;
    }

    .buttons {
        width: 400px;
        display:flex;
        flex-direction: column;
    }

    .zeroButton {
        text-align: center;
    }

    .numberButtons {
        flex-grow: 0;
        width: 60%;
        text-align: center;
    }

    .specialButtons {
        flex-grow: 0;
        display:flex;
        flex-direction: column;

    }

    .numberPad {
        width: 300px;
        margin: 20px auto 20px auto;

        display:flex;
        flex-direction: row;
    }

    h1 {
        text-align: center;
    }

    nav {
        text-align: center;

    }

</style>
