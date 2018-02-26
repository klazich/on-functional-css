<template>
  <transition v-if="show" name="fade" mode="out-in">
    <header-right-public v-on:toggled="show = !show"/>
  </transition>

  <transition v-else name="fade" mode="out-in">
    <header-right-auth v-on:toggled="show = !show"/>
  </transition>
</template>

<script>
  import HeaderRightPublic from './HeaderRightPublic.vue'
  import HeaderRightAuth from './HeaderRightAuth.vue'

  export default {
    name      : 'header-meta-block',
    components: {
      HeaderRightPublic, HeaderRightAuth,
    },
    data() {
      return { show: true }
    },
    methods   : {
      toggle() {
        this.show = !this.show
      },
    },
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition : opacity .1s;
  }

  .fade-enter, .fade-leave-to {
    opacity : 0;
  }
</style>