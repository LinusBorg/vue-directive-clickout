<template>
  <div>
    <div class="container">
      <div class="target" v-click-outside="clickedOutside" @click="clickedInside">
        <p>Clicking this box will trigger the @click event</p>
        <p>Clicking outside of this box will trigger method provided to the v-click-outside directive</p>
        <p>If you add the <span class="inline-code">.bubble</span> modifier, clicks inside will
          also trigger the callback of the clickoutside directive</p>
      </div>
    </div>
  </div>
</template>

<script>
import VueClickoutDirective from '../src/index'

export default {
  data () {
    return {
      count: 0
    }
  },
  directives: {
    'click-outside': VueClickoutDirective
  },
  methods: {
    clickedInside(event) {
      alert('you clicked inside!')
      console.log('Event for click inside:', event)
    },
    clickedOutside(event) {
      alert('you clicked outside!')
      console.log('Event for click outside:', event)
    },
  }
}
</script>

<style>
  body {
    background-color: #DDD;
  };
  .container {
    margin: 50px;
    padding:30px;
  }
  .target {
    padding: 20px 30px;
    border: 1px solid black;
    background-color: white;
  }
  .inline-code {
    background-color: #BBB;
    font-family: monospace;
  }
</style>
