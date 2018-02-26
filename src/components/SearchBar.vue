<template>
  <div class="inline-flex items-center ml-auto">
    <a type="button" @click="show = !show;" class="link pointer gray hover-black-80 mr2">
      <SearchIcon/>
    </a>
    <input v-show="show" id="searchInput" type="text" class="f6 h2 w-100 b--none black-70 mr2" placeholder="Search">
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
    }
  }
</script>

<style scoped>

</style>