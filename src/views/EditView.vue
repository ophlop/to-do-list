<template>
    <div class="container">
        <TheModalDelete
            :visible="modalDelete"
            :id="Number(currentId)"
            @delete="deleteTask"
            @close="closeDelete"
        />
        <TheModalCancel
            :visible="modalCancel"
            :id="Number(currentId)"
            @cancel="canselChanges"
            @close="closeCancel"
        />
        <div class="task">
            <div class="task_title-info">
                <input
                    class="inputfix"
                    type="checkbox"
                    @click="finishTaskEdit"
                    :checked="$store.state.viewTask.completedTask === 'done'"
                />
                <AppTitle
                    style="margin-bottom: 0"         
                    :type="'h1'"
                    :textColor="'darkText'"
                    :text="$store.state.viewTask.nameTask"
                    :finishClass="$store.state.viewTask.completedTask"
                />
            </div>
            <div class="task_title-btns">
                <button @click="renameShow = !renameShow">Rename</button>
            </div>
            <div class="task__edit-form" v-if="renameShow === true">
                <input type="text" v-model="titleRename">
                <button @click="editTitle" class="sample">Rename</button>
            </div>
        </div>
        <AppTitle             
            :type="'h2'"
            style="margin-bottom: 20px"
            :textColor="'darkText'"
            :text="'Steps in Task: ' + `${ !$store.state.viewTask.steps || $store.state.viewTask.steps === null ? 0 : $store.state.viewTask.steps.length}` "
        />
        <div class="task__step-form">
            <input type="text" v-model="inputValue">
            <button class="primary" @click="addStep(currentId)">Add Step</button>
        </div>
        <div >
            <AppStep 
            v-for="step in $store.state.viewTask.steps" :key="step.idStep"
                :name="step.nameStep"
                :id="step.idStep"
                @edit="editName"
                @delete="deleteStep"
                @stateTask="finishStepEdit"
                :finishClass="step.completedStep"
            />
        </div>
        <div class="task__history-btns">
            <button @click="undoHistory" :disabled="!canUndo">Undo</button>
            <button @click="redoHistory" :disabled="!canRedo">Redo</button>
        </div>
        <div class="task__important-btns">
        <button @click="closeDelete" class="danger">Delete task</button>
        <button @click="closeCancel" class="sample">Cancel task changes</button>
        <button @click="saveTask" class="primary">Save</button>
        </div>
    </div>
</template>

<script>
import AppTitle from '../UI/AppTitle.vue'
import TheTaskForm from '../components/TheTaskForm.vue'
import AppStep from '../components/AppStep.vue'
import TheModalDelete from '../components/TheModalDelete.vue'
import TheModalCancel from '../components/TheModalCancel.vue'

export default {
    data() {
        return {
            inputValue: '',
            titleRename: '',
            modalDelete: false,
            modalCancel: false,
            renameShow: false,
            currentId: this.$router.currentRoute.value.params['id'],
        }
    },
    methods: {
        closeDelete () {
            this.modalDelete = !this.modalDelete
        },
        closeCancel () {
            this.modalCancel = !this.modalCancel
        },
        finishTaskEdit () {
            this.$store.commit('finishTaskEdit')
        },
        finishStepEdit (id) {
            this.$store.commit('finishStepEdit', id)
        },
        addStep () {
            this.$store.commit('addStep', this.inputValue)
            this.inputValue = ''
        },
        editTitle () {
            this.$store.commit('editTaskTitle', this.titleRename)
            this.titleRename = ''
            this.renameShow = false
        },
        editName (renameInput, id) {
            this.$store.commit('editStepName' , {
                rename: renameInput,
                stepId: id
            })
        },
        deleteStep (step) {
            this.$store.commit('deleteStep', step)
        },
        saveTask () {
            this.$store.commit('saveTask', this.currentId)
            this.$router.push('/')
        },
        deleteTask (id) {
            this.$store.commit('deleteTask', id),
            this.modalDelete = false
            this.$router.push('/')
        },
        canselChanges () {
            this.$store.commit('canselChanges', this.currentId)
            this.modalCancel = false
        },
        undoHistory () {
            if (this.canUndo) {
                this.$store.commit('undoHistory')
            }
        },
        redoHistory () {
            if (this.canRedo) {
              this.$store.commit('redoHistory')
            }
        }
    },
    computed: {
        showTask () {
            return this.$store.commit('showTask', this.currentId)
        },
        canUndo () {
            return this.$store.state.historyStep > 0
        },
        canRedo () {
            return this.$store.state.historyTask.length - 1 - this.$store.state.historyStep > 0
        }
    },
    mounted() {
        this.showTask
        this.canUndo
        this.canRedo
    },
    components: { AppTitle, TheTaskForm, AppStep, TheModalDelete, TheModalCancel }
}
</script>

<style lang="scss">
@import '../assets/scss/views/edit.scss';
</style>