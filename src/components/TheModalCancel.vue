<template>
  <div class="modal-window" v-if="visible === true">
      <div class="window">
          <AppTitle :textColor="'darkText'" :type="'h2'" :text="`Do you want to undo all changes?`"/>
          <div class="modal-window_btns">
            <button @click="$emit('cancel')">Yes</button>
            <button @click="$emit('close')">No</button>
          </div>
      </div>
  </div>
</template>

<script>
import AppTitle from '../UI/AppTitle.vue'

  export default {
    emits: ['cancel', 'close'],
    components: { AppTitle },
    props: [ 'visible', 'title', 'id'],

  };
</script>

<style scoped lang="scss">
@import '../assets/scss/elements/modal.scss'
</style>