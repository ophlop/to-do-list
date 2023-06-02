<template>
  <div class="container">
    <the-task-form :form="'task'"></the-task-form>
    <section class="task-sections">
      <app-title :type="'h1'" :text="'Your tasks'"></app-title>
      <div v-if="this.$store.state.tasks.length === 0" class="tasks-cards empty">
          <app-title :type="'h2'" :textColor="'lightText'" :text="'Tasks list empty!'" ></app-title>
          <app-title :type="'h3'" :textColor="'lightText'" :text="'Add your comparison formula above'"></app-title>
      </div>
      <AppTask
          v-for="task in this.$store.state.tasks"
          :key="task.id"
          :id="task.id"
          :open="task.openTask"
          :finishState="task.completedTask"
          :title="task.nameTask"
          :steps='task.steps'
          @finish='finishTask'
      />
    </section>
  </div>
</template>

<script>
import TheTaskForm from '../components/TheTaskForm.vue'
import AppTitle from '../UI/AppTitle.vue'
import AppTask from '../components/AppTask.vue'

export default {
  data () {
    return {
      inputValue: '',
      counter: 0,
      openSteps: false,
    }
  },
  methods: { 
      addTasks () {
        if (this.inputValue.length !== 0) {
            this.$store.commit('createTask', this.inputValue)
            this.inputValue = ''
        }
      },
      finishTask (id) {
          this.$store.commit('finishTask', id)
      }
  },
  components: { AppTitle, AppTask, TheTaskForm }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common/task-cards.scss';

.task-sections {
    width: 100%;
    display: block;
}

.empty {
    display: block;
    text-align: center;
}
</style>