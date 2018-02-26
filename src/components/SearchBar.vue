<template>

  <div class="inline-flex items-center ml-auto">

    <a @click="show = !show" href="#" class="link gray hover-black-80 mr2">
      <SearchIcon/>
    </a>
    <transition>
      <input v-if="show" type="text" class="f6 w-100 b--none black-70 mr2" placeholder="Search">
    </transition>
  </div>

</template>

<script>
  import SearchIcon from '../img/icons/search.svg'

  export default {
    name      : 'search-bar',
    components: {
      SearchIcon,
    },
    data() {
      return { show: false }
    },
  }
</script>

<style scoped>

</style>