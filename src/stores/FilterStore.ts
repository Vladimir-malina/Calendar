import { makeAutoObservable } from "mobx"

export class FilterStore {

  filteredDays: DaysWithTask = []
  filteredText: string = ''
  filteredColor: string = ''

  constructor() {
    makeAutoObservable(this);
  }

  get isFiltering(): boolean {
    return Boolean(this.filteredText) || Boolean(this.filteredColor)
  }

  setFilteredColor(color: string) {
    this.filteredColor = color
  }

  setFilteredText(text: string) {
    this.filteredText = text
  }

  setFilteredDays(value: DaysWithTask) {
    this.filteredDays = value
  }

  getFilteredTasksByDay(dayId: string) {
    return this.filteredDays.find(({ id }) => dayId === id)?.tasks
  }
}