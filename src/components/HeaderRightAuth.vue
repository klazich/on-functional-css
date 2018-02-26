<template>
  <div key="loggedIn" class="inline-flex items-center ml-auto h-100">
    <SearchBar/>
    <a href="#" class="gray hover-black-80 mh3 v-mid">
      <NotificationIcon/>
    </a>
    <a @click="$emit('toggled')">
      <img src="../img/avatar.png" class="br-100 h2 v-mid">
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