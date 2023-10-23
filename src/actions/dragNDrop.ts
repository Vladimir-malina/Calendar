import { dragTasksStore, tasksStore } from "../stores";

export const handleDayDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

export const handleDayDrop = (e: React.DragEvent<HTMLDivElement>, dragTask: Task | null, dayId: string) => {
  e.preventDefault();
  if (!dragTask) return;
  tasksStore.deleteTask(dragTask.id);
  if (dragTask.dayId !== dayId) {
    dragTask.dayId = dayId;
  }
  tasksStore.addTask(dragTask);
};

export const handleTaskDragStart = (e: React.DragEvent<HTMLDivElement>, currentTask: Task) => {
  dragTasksStore.setDraggableTask(currentTask);
  e.currentTarget.style.backgroundColor = "#fbfbfb92";
};

export const handleTaskDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  e.currentTarget.style.backgroundColor = "#fbfbfb";
};

export const handleTaskDrageLeave = (e: React.DragEvent<HTMLDivElement>) => {
  e.currentTarget.style.backgroundColor = "#fbfbfb";
};

export const handleTaskDragOver = (e: React.DragEvent<HTMLDivElement>, dragTask: Task | null, currentTask: Task) => {
  e.preventDefault();
  if (dragTask === currentTask) return;
  e.currentTarget.style.backgroundColor = "#c9c8c8";
};

export const handleTaskDrop = (e: React.DragEvent<HTMLDivElement>, dragTask: Task | null, currentTask: Task) => {
  e.preventDefault();
  e.stopPropagation()
  if (!dragTask || dragTask === currentTask) return;
  const tasksForDropDay = tasksStore.getTasksForCurrentDay(currentTask.dayId);
  const tasksForDragDay = tasksStore.getTasksForCurrentDay(dragTask.dayId);
  if (!tasksForDropDay || !tasksForDragDay) return;

  tasksStore.deleteTask(dragTask.id);
  if (dragTask.dayId !== currentTask.dayId) {
    dragTask.dayId = currentTask.dayId;
  }
  const dropIndex = tasksForDropDay?.indexOf(currentTask);
  const dragIndex = tasksForDragDay?.indexOf(dragTask);
  const usedIndex = dropIndex <= dragIndex ? dropIndex + 1 : dropIndex
  tasksStore.addTaskByIndexInDay(dragTask, usedIndex, currentTask.dayId);
  e.currentTarget.style.backgroundColor = "#fbfbfb";
}