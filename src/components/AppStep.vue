<template>
    <div class="step">
        <div class="step__header">
            <input
                type="checkbox"
                :checked="finishClass === 'done'"
                @click="$emit('stateTask', id)"
            />
            <AppTitle
                :type="'h3'"
                :textColor="'darkText'"
                :text="name"
                :finishClass="finishClass"
            />
        </div>
        <div class="step__edit-form" v-if="editInput === true" > 
            <input type="text" v-model="renameInput">
            <button @click="editRename">Done</button>
        </div>
        <div class="step__btns">
        <button @click="editInput = !editInput">Edit</button>
        <button class="danger" @click="$emit('delete', id)">Delete</button>
        </div>
    </div>
</template>

<script>
import AppTitle from '../UI/AppTitle.vue'


export default {
    data () {
        return {
            renameInput: '',
            editInput: false
        }
    },
    methods: {
        editRename() {
            this.$emit('edit', this.renameInput, this.id)
            this.renameInput = ''
            this.editInput = false
        }
    },
    emits: [ 'edit', 'delete', 'stateTask'],
    props: [ 'name', 'id', 'finishClass'],
    components: { AppTitle }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/common/step.scss';
</style>