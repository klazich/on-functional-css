<template>
  <div key="public" class="inline-flex items-center ml-auto h-100">
    <a @click="$emit('toggled')"
     href="#"
     class="f6 link nowrap green mr3 dn di-ns">Sign in</a>
    <button @click="$emit('toggled')"
     type="button"
     class="f6 link green pointer nowrap br2 ba b--green bg-white pv2 ph3 ml1 mv1">
      Get started
    </button>
  </div>
</template>

<script>
  export default {
    name: 'header-meta-public',
  }
</script>

<style scoped>

</style>