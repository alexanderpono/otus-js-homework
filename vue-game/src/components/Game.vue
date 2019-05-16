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

        <div class="quizNumber">
            Задача №{{quizNumber}}
        </div>

        <div class="quiz">
            <span id="num1">{{firstOperand}}</span>
            {{mathOperation1}}
            <input id="num2" type="text" v-model="answer1" v-bind:class="num2Class"/>
            {{mathOperation2}}
            <input id="num3" type="text" v-model="answer2" v-bind:class="num3Class"/>
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

        <div id="lastAnswerStat" v-bind:class="lastAnswerStatClass">
            <p><span class="parameter">Ваш ответ на задачу №{{quizNumber}}:</span> {{userLastAnswer}}</p>
            <p><span class="parameter">Целевое значение:</span> {{lastSupposedAnswer}}</p>
            <p><span class="parameter">Точность ответа, %:</span> {{lastAnswerAccuracy}}</p>
        </div>

    </div>
</template>

<script>
import AppMenu from './Menu.vue'
import appState from '@/state'

const INPUT1 = 'num2'
const INPUT2 = 'num3'
const ANSWER_VAR1 = 'answer1'
const ANSWER_VAR2 = 'answer2'
const NO_ANSWER_YET = -0.5

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
            mathOperation2: '+',
            currentInput: INPUT1,
            quizNumber: 0,
            quizesNumber: appState.getVal('quizesNumber'),
            quizesAccuracy: appState.getVal('quizesAccuracy'),
            userLastAnswer: NO_ANSWER_YET,
            lastAnswerAccuracy: 0,
            lastSupposedAnswer: 0,
            thisSessionQuizNumber: 0,
            thisSessionQuizSolved: 0
        }
    },
    methods: {
        cancel: function () {
            this.$router.push('/settings/')
        },
        btNumber: function (param) {
            let targetAnswerVar = ANSWER_VAR1
            if (this.currentInput !== INPUT1) {
                targetAnswerVar = ANSWER_VAR2
            }
            this[targetAnswerVar] = '' + this[targetAnswerVar] + param
        },
        btLess: function (param) {
            this.switchInput()
        },
        btMore: function (param) {
            this.switchInput()
        },
        btQuestion: function (param) {
            this.reQuiz()
        },
        switchInput: function () {
            if (this.currentInput === INPUT1) {
                this.currentInput = INPUT2
                this.answer2 = ''
            } else {
                this.currentInput = INPUT1
                this.answer1 = ''
            }
        },

        btEqual: function (param) {
            let userAnswer = this.getUserAnswer()
            let answerAccuracy = this.getAnswerAccuracy(userAnswer)
            this.quizesNumber++
            this.quizesAccuracy.push(answerAccuracy)
            appState.setVal('quizesAccuracy', this.quizesAccuracy)

            this.userLastAnswer = userAnswer
            this.lastAnswerAccuracy = answerAccuracy
            this.lastSupposedAnswer = this.supposedAnswer
            this.thisSessionQuizNumber++
            appState.setVal('lastTotal', this.thisSessionQuizNumber)

            if (answerAccuracy !== 0) {
                this.thisSessionQuizSolved++
            }
            appState.setVal('lastSolved', this.thisSessionQuizSolved)

            this.nextQuiz()
        },

        op: function (mathOperationCode, operand1, operand2) {
            switch (mathOperationCode) {
            case '*':
                return operand1 * operand2
            case '+':
                return operand1 + operand2
            case '-':
                return operand1 - operand2
            case '/':
                return operand1 / operand2
            }
            return 0
        },

        getUserAnswer: function () {
            let answer1 = parseInt(this.answer1)
            let answer2 = parseInt(this.answer2)
            if (isNaN(answer1)) {
                answer1 = 0
            }
            if (isNaN(answer2)) {
                answer2 = 0
            }
            let userAnswer = this.op(this.mathOperation1, this.firstOperand, answer1)
            userAnswer = this.op(this.mathOperation2, userAnswer, answer2)

            return userAnswer
        },

        getAnswerAccuracy: function (userAnswer) {
            let deviation = Math.abs(userAnswer - this.supposedAnswer) / this.supposedAnswer
            let answerAccuracy = 100 - Math.round(deviation * 100)
            if (answerAccuracy < 0) {
                answerAccuracy = 0
            }

            return answerAccuracy
        },

        nextQuiz: function () {
            this.quizNumber++
            this.reQuiz()
        },

        reQuiz: function () {
            this.firstOperand = Math.round(100 * Math.random())
            this.supposedAnswer = Math.round(100000 * Math.random())
            this.answer1 = ''
            this.answer2 = ''

            let ops = []
            if (appState.getVal('sum')) {
                ops.push('+')
            }
            if (appState.getVal('sub')) {
                ops.push('-')
            }
            if (appState.getVal('mul')) {
                ops.push('*')
            }
            if (appState.getVal('div')) {
                ops.push('/')
            }
            let op1 = ops[Math.floor(ops.length * Math.random())]
            let op2 = ops[Math.floor(ops.length * Math.random())]
            if ((op2 === '*') || (op2 === '/')) {
                let tmp = op1
                op1 = op2
                op2 = tmp
            }

            this.mathOperation1 = op1
            this.mathOperation2 = op2
        }
    },
    components: {
        AppMenu
    },
    computed: {
        num2Class: function () {
            let newClass = ''
            if (this.currentInput === INPUT1) {
                newClass = 'cur'
            }
            return newClass
        },

        num3Class: function () {
            let newClass = ''
            if (this.currentInput === INPUT2) {
                newClass = 'cur'
            }
            return newClass
        },

        lastAnswerStatClass: function () {
            let newClass = ''
            if (this.userLastAnswer === NO_ANSWER_YET) {
                newClass = 'hideme'
            }
            return newClass
        }

    },
    created: function () {
        this.quizNumber = this.quizesNumber

        this.nextQuiz()
    },
    activated: function () {
        this.thisSessionQuizNumber = 0
        this.thisSessionQuizSolved = 0
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

    .cur {
        background: green;
        color: white;
    }

    .quizNumber {
        text-align: center;
    }

    #lastAnswerStat {
        margin-left: 100px;
    }
    #lastAnswerStat P {
        margin: 0px;
    }
    #lastAnswerStat .parameter {
        display: block;
        width: 200px;
        float: left;
    }

    .hideme {
        display: none;
    }

</style>
