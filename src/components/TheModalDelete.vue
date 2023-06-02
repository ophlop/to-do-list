<template>
  <div class="modal-window" v-if="visible === true">
      <div class="window">
          <AppTitle :textColor="'darkText'" :type="'h2'" :text="`You really want delete task?`"/>
          <div class="modal-window_btns">
            <button class="danger" @click="$emit('delete', id)">Yes</button>
            <button class="primary" @click="$emit('close')">No</button>
          </div>
      </div>
  </div>
</template>

<script>
import AppTitle from '../UI/AppTitle.vue'

export default {
    emits: ['delete', 'close'],
    components: { AppTitle },
    props: [ 'visible', 'title', 'id'],

};
</script>

<style scoped lang="scss">
@import '../assets/scss/elements/modal.scss'
</style>