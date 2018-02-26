<template>
  <div key="loggedIn" class="inline-flex items-center ml-auto">
    <SearchBar/>
    <a href="#" class="link gray hover-black-80 mr3">
      <NotificationIcon/>
    </a>
    <a @click="$emit('toggled')">
      <img src="../img/avatar.png" class="br-100 h2 w2">
    </a>
  </div>
</template>

<script>
  import NotificationIcon from '../img/icons/notification.svg'
  import SearchBar from './SearchBar.vue'

  export default {
    name      : 'header-meta-logged-in',
    components: {
      NotificationIcon, SearchBar,
    },
  }
</script>

<style scoped>

</style>