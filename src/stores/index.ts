import { DragTaskStore } from "./DragTaskStore";
import { FilterStore } from "./FilterStore";
import { TasksStore } from "./TasksStore";

export const tasksStore = new TasksStore()
export const dragTasksStore = new DragTaskStore()
export const filterStore = new FilterStore()