<template>
    <div class="tasks-cards">
        <div class="tasks-cards__header">
            <div class="tasks-cards__title" >
                <input
                    type="checkbox"
                    :value="checkValue"
                    @click="$emit('finish', id)"
                    :checked="finishState === 'done'"
                >
                <AppTitle
                    @click="open = !open"
                    :type="'h2'"
                    :textColor="'lightText'"
                    :text="title"
                    :finishClass="finishState"
                />
            </div>
            <p class="tasks-cards__description" style="color: white">{{ countSteps }}</p>
            <div class="cards-btns">
                <AppButton :btnTitle="'Edit'" :link="'/edit/' + id" :type="'link'" :btnClass="'sample'" />
                <AppButton :btnTitle="'Delete'" :type="'button'" :btnClass="'danger'" @click="modalDelete = !modalDelete"/>
                <TheModalDelete
                    :visible="modalDelete"
                    :title="title"
                    :id="id"
                    @delete="deleteTask"
                    @close="closeModal"
                />
            </div>
        </div>
        <div class="task-steps-info" v-if="open === true">
            <AppTitle
                v-if="steps.length === 0"
                :type="'h2'"
                :textColor="'lightText'"
                :text="'Subtasks list empty!'"
            />
            <AppTaskStep 
                v-else
                v-for='step in steps'
                :key="step.idStep"
                :idStep="step.idStep"
                :stepText="step.nameStep"
                :stepState="step.completedStep"
                @finish="finishStep"
            />
        </div>
    </div>
</template>
    
<script>
import AppTitle from '../UI/AppTitle.vue'
import AppButton from '../UI/AppButton.vue'
import AppTaskStep from '../components/AppTaskStep.vue'
import TheModalDelete from './TheModalDelete.vue'

    
export default {
    data () {
        return {
            checkValue: false,
            modalDelete: false
        }
    },
    methods: {
        closeModal () {
            this.modalDelete = !this.modalDelete
        },
        deleteTask (id) {
            this.$store.commit('deleteTask', id),
            this.modalDelete = false
        },
        finishStep (idStep) {
            this.$store.commit('finishStep', {
                id: this.id,
                idStep: idStep 
            })
        }
    },
    computed: {
        countSteps () {
            let allSteps = this.steps.length
            let doneSteps = this.steps.filter(step => step.completedStep === 'done').length
            return `All steps in this task: ${allSteps} | Done steps: ${doneSteps}`
        }  
    },
    emits: [ 'finish'],
    components: { AppTitle, AppButton, TheModalDelete, AppTaskStep },
    props: [ 'id', 'title', 'open', 'finish', 'finishState', 'steps' ]
}
</script>
    
<style scoped lang="scss">
@import '../assets/scss/common/task-cards.scss';

.empty {
    display: block;
    text-align: center;
}
</style>