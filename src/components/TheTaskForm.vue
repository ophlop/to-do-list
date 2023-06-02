<template>
    <section class="form-section" v-if="form === 'task'">
        <app-title
            :type="'h2'"
            :textColor="'lightText'"
            :text="'Add your task'">
        </app-title>
        <form action="#" @submit.prevent="createTask">
            <input type="text" v-model="inputValue"/>
            <AppButton
                :btnTitle="isDisabled === true ? 'Fill input' : 'Add task'"
                :typeButton="'submit'"
                :btnClass="'sample'"
                :disabled='isDisabled'
            />
        </form>
    </section>
</template>

<script>
import AppTitle from '../UI/AppTitle.vue'
import AppButton from '../UI/AppButton.vue'

export default {
    data () {
        return {
            inputValue: '',
        }
    },
    methods: {
      createTask() {
        this.$store.commit("createTask", this.inputValue);
        this.inputValue = "";
      },
    },  
    computed: {
        isDisabled: function () {
                return this.inputValue === ''
        }
    },
    props: ['form'],
    components: { AppTitle, AppButton }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/common/form.scss';
</style>