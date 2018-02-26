import Vue from 'vue'

import snippets from './js/data'

Vue.component('code-snippet', {
  template: `<figure class="highlight css"><pre><code>{{ snippet }}</code></pre></figure>`,
  data    : () => ( { snippet: snippets.shift() } ),
})

new Vue({
  el: '#app',
})
