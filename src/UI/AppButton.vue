<template>
  <button v-if="type === 'submit'" type="submit" :class="btnClass" :disabled="disabled">{{ btnTitle }}</button>
  <router-link v-else-if="type === 'link'" :to="link" class="router" :class="btnClass">{{ btnTitle }}</router-link>
  <button v-else :class="btnClass" @click="$emit('click')">{{ btnTitle }}</button>
</template>

<script>
export default {
    emits: [ 'click'],
        props: {
            btnTitle: String,
            btnClass: String,
            type: {
                type: String,
                default: ''
            },
            disabled: Boolean,
            link: {
                type: String,
                default: ''
            }
        }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/styles.scss';

button, .router  {
    width: 120px;
    height: 40px;
    border: 0;
    border-radius: 10px;
    font-size: $btnFont;
    cursor: pointer;
    font-family: $fontFamily;
}

.router {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.sample {
    color: $darkGray;
    background-color: $lightGray;
}

.primary {
    color: $veryLightGray;
    background-color: $darkGray;
}

.danger {
    color: $white;
    background-color: $dangerRed;
}

button:disabled {
        color: $darkGray;
        background-color: $grafitGray;
}
</style>