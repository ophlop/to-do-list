<template>
        <h1 v-if="type === 'h1'" :class="[textColor, finishClass]" class="marginTitle">{{ text }}</h1>
        <h2 v-else-if="type === 'h2'" :class="[textColor, finishClass]">{{ text }}</h2>
        <h3 v-else-if="type === 'h3'" :class="[textColor, finishClass]">{{ text }}</h3>
</template>
      
<script>
export default {
    props: ['text', 'type', 'textColor', 'finishClass'],
}
</script>
      
<style scoped lang="scss">
@import '../assets/scss/styles.scss';
      
h1 {
          font-size: $h1Size;
          font-family: $fontFamily;
          margin: 0;
}
      
h2 {
          font-size: $h2Size;
          font-family: $fontFamily;
          margin: 0;
}
      
h3 {
          font-size: $h3Size;
          font-family: $fontFamily;
          margin: 0;
}

.done {
    text-decoration: line-through;
}

.active {
    text-decoration: none;
}
      
.darkText {
          color: $darkGray;
}
      
.lightText {
          color: $veryLightGray;
}
      
.marginTitle {
          margin-bottom: 20px;
}
      
</style>