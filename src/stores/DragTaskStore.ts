import { makeAutoObservable } from "mobx";

export class DragTaskStore {

  draggableTask: Task | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setDraggableTask (task: Task) {
    this.draggableTask = task
  }
}