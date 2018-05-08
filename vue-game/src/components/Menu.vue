<template>
    <nav>
        <ul>
            <li>
                <a href="#/settings/" :class="settingsClass">Settings</a>
            </li>
            <li>
                <a href="#/game/" :class="gameClass">Game</a>
            </li>
        </ul>
    </nav>

</template>

<script>
export default {
    name: 'Menu',
    props: ['current'],
    data () {
        // console.log('data() this.current=', this.current)
        return {
            settingsClass: (this.current === 'settings') ? 'current' : '',
            gameClass: (this.current === 'game') ? 'current' : ''
        }
    },
    methods: {
    }
}

</script>

<style scoped>
    .current {
        font-weight: bold;
    }

    nav {
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

</style>
