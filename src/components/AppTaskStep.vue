<template>
    <div class="steps-list">
        <input
            type="checkbox"
            v-model="checkValue"
            @click="$emit('finish', idStep)"
            :checked="stepState === 'done'"
        />
        <app-title
            :type="'h3'"
            :textColor="'darkText'"
            :text="stepText"
            :finishClass="stepState"
        ></app-title>
    </div>
</template>

<script>
import AppTitle from '../UI/AppTitle.vue'
export default {
        data () {
            return {
                checkValue: this.stepState === 'done',
            }
        },
        emits: ['finish'],
        props: ['stepText', 'checkStep', "stepState", 'idStep'],
        components: { AppTitle }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common/task-cards.scss';

</style>