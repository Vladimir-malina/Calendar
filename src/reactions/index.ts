import { reaction } from "mobx";
import { filterStore, tasksStore } from "../stores";

export const observeFilters = () => {
  return reaction(() => [filterStore.filteredColor, filterStore.filteredText, tasksStore.tasks],
   () => {
      filterStore.filteredDays = tasksStore.daysWithTasks.map(day => { 
        const updatedTasks = day.tasks.filter(task => {
          if (!filterStore.filteredText) {
            return task.colorLabels.includes(filterStore.filteredColor)
          }
          if (!filterStore.filteredColor) {
            return task.text.includes(filterStore.filteredText)
          }
          return task.text.includes(filterStore.filteredText) && task.colorLabels.includes(filterStore.filteredColor)
        })
        return {...day, tasks: updatedTasks}
      })
   })
}