import { createStore } from 'vuex'

export default createStore({
    state: {
      tasks: !localStorage.getItem('tasks') ? [] : JSON.parse(localStorage.getItem('tasks')),
      viewTask: [],
      historyTask: [],
      historyStep: 0,
      taskId: 0,
      stepId: 0
    },
    mutations: {
        createTask: (state, payload) => {
            let counter = state.taskId
            state.tasks.push({ 
              id: counter,
              nameTask: payload,
              openTask: false,
              completedTask: 'active',
              steps: []
            })
            state.taskId = state.taskId + 1
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        showTask (state, payload) {
            state.viewTask = state.tasks.find(e => e.id === Number(payload))
            state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
            state.historyStep = state.historyTask.length - 1
        },
        saveTask (state, payload) {
            state.tasks = state.tasks.filter(task => task.id !== Number(payload))
            state.tasks.push(state.viewTask)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
            state.viewTask = []
            state.historyTask = []
        },
        finishTaskEdit (state) {
            if (state.viewTask.completedTask === 'done') {
                state.viewTask.completedTask = 'active'
                state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
            } else {
                state.viewTask.completedTask = 'done'
                state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
            }
        },
        finishTask (state, payload) {
            if (state.tasks.find(task => task.id === Number(payload)).completedTask === 'done') {
                state.tasks.find(task => task.id === Number(payload)).completedTask = 'active'
                localStorage.setItem('tasks', JSON.stringify(state.tasks))
            } else {
                state.tasks.find(task => task.id === Number(payload)).completedTask = 'done'
                localStorage.setItem('tasks', JSON.stringify(state.tasks))
            }
        },
        editTaskTitle (state, payload) {
            state.viewTask.nameTask = payload
            state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
        },
        deleteTask (state, payload) {
            state.tasks = state.tasks.filter(task => task.id !== Number(payload));
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        canselChanges (state) {
            state.viewTask = state.historyTask[0]
            state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
        },
        addStep (state, payload) {
            let counter = state.stepId
            state.viewTask.steps.push({
                nameStep: payload,
                idStep: counter,
                completedStep: 'active'
            })
            state.stepId = state.stepId + 1
            state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
        },
        editStepName (state, payload) {
            state.viewTask.steps.find(step => step.idStep === Number(payload.stepId)).nameStep = payload.rename
            state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
        },
        finishStepEdit (state, payload) {
            if (state.viewTask.steps.find(step => step.idStep === Number(payload)).completedStep === 'done') {
                state.viewTask.steps.find(step => step.idStep === Number(payload)).completedStep = 'active'
                state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
            } else {
                state.viewTask.steps.find(step => step.idStep === Number(payload)).completedStep = 'done'
                state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
            }
        },
        finishStep (state, payload) {
            if (state.tasks.find(task => task.id === payload.id).steps.find(step => step.idStep === payload.idStep).completedStep === 'done') {
                state.tasks.find(task => task.id === payload.id).steps.find(step => step.idStep === payload.idStep).completedStep = 'active'
                localStorage.setItem('tasks', JSON.stringify(state.tasks))
            } else {
                state.tasks.find(task => task.id === payload.id).steps.find(step => step.idStep === payload.idStep).completedStep = 'done'
                localStorage.setItem('tasks', JSON.stringify(state.tasks))
            }
        },
        deleteStep (state, payload) {
            state.viewTask.steps = state.viewTask.steps.filter(e => e.idStep !== payload)
            state.historyTask.push(JSON.parse(JSON.stringify(state.viewTask)))
        },
        undoHistory (state) {
            state.historyStep -= 1
            state.viewTask = state.historyTask[state.historyStep]
        },
        redoHistory (state) {
            state.historyStep += 1
            state.viewTask = state.historyTask[state.historyStep]
        }
    },
})
