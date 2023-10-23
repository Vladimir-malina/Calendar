import { makeAutoObservable } from "mobx";

export class TasksStore {

  daysWithTasks: DaysWithTask = []

  constructor() {
    makeAutoObservable(this);
  }

  get tasks(): TasksType {
    const taskArr: TasksType = []
    this.daysWithTasks.forEach(({ tasks }) => tasks.forEach(task => taskArr.push(task)))
    return taskArr
  }

  setDaysWithTasks (newValue: DaysWithTask) {
    this.daysWithTasks = newValue
  }

  addTask(task: Task) {
    const dayWithTasks = this.getDayById(task.dayId)
    if (dayWithTasks) {
      const indexOfDay = this.daysWithTasks.indexOf(dayWithTasks)
      this.daysWithTasks[indexOfDay] = { ...dayWithTasks, tasks: [...dayWithTasks.tasks, task] }
    } else {
      this.daysWithTasks = [...this.daysWithTasks, { id: task.dayId, tasks: [task] }]
    }
  }

  addTaskByIndexInDay(task: Task, index: number, dropDayId: string) {
    const dropDay = this.getDayById(dropDayId)
    if (!dropDay) {
      return
    }
    const indexOfDay = this.daysWithTasks.indexOf(dropDay)
    this.daysWithTasks[indexOfDay].tasks.splice(index, 0, task)
  }

  editTask(taskId: number, newValue: Task) {
    const dayWithTask = this.getDayByTaskId(taskId)
    if (!dayWithTask) return

    const indexOfDay = this.daysWithTasks.indexOf(dayWithTask)
    const indexOfTask = dayWithTask.tasks.indexOf(this.getTaskById(taskId))

    let newTasks = dayWithTask.tasks
    newTasks[indexOfTask] = newValue

    this.daysWithTasks[indexOfDay] = { ...dayWithTask, tasks: newTasks }
  }

  deleteTask(taskId: number) {
    const dayWithTask = this.getDayByTaskId(taskId)
    
    if (!dayWithTask) return
    const indexOfDay = this.daysWithTasks.indexOf(dayWithTask)
    if (dayWithTask.tasks.length > 1) {
      this.daysWithTasks[indexOfDay] = { ...dayWithTask, tasks: dayWithTask.tasks.filter(task => task.id !== taskId) }
    } else {
      this.daysWithTasks.splice(indexOfDay, 1)
    }
  }

  getDayById(dayId: string) {
    return this.daysWithTasks.find(({ id }) => dayId === id)
  }

  getDayByTaskId = (taskId: number) => {
    const task = this.getTaskById(taskId)
    return this.daysWithTasks.find(day => day.tasks.includes(task))
  }

  getTasksForCurrentDay(dayId: string) {
    return this.getDayById(dayId)?.tasks
  }

  getTaskById(taskId: number) {
    return this.tasks.find(task => task.id === taskId) as Task
  }

  getTaskColors(taskId: number) {
    return this.getTaskById(taskId)!.colorLabels
  }
}
