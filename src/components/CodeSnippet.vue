<template>
  <figure class="highlight css br2 bg-light-gray">
    <pre class="pa3"><code>{{ snippet }}</code></pre>
  </figure>
</template>

<script>
  import snippets from '../js/data'

  export default {
    name: 'code-snippet',
    data() { return { snippet: snippets.shift() } },
  }
</script>

<style scoped>

</style>