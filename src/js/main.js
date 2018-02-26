import Vue from 'vue'

import CodeSnippet from '../components/CodeSnippet.vue'
import HeaderMetaBlock from '../components/HeaderRight.vue'

new Vue({
  el        : '#app',
  components: {
    CodeSnippet,
    HeaderMetaBlock,
  },
})

new Vue({
  el: '#header',
  components:{
    HeaderMetaBlock
  }
})
