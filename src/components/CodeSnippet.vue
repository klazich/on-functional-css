<template>
  <figure class="css br2 bg-light-gray mh0 mh4-l">
    <pre class="pa3 pl4-ns f6 f5-ns"><code class="">{{ snippet }}</code></pre>
  </figure>
</template>

<script>
import snippets from "../js/data";

export default {
  name: "code-snippet",
  data() {
    return { snippet: snippets.shift() };
  }
};
</script>

<style scoped>

</style>