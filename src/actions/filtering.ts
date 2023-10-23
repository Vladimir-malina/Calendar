import { filterStore } from "../stores";

export const handleFilterTasksByText = (e: React.ChangeEvent<HTMLInputElement>) => {
  filterStore.setFilteredText(e.target.value.trim());
};

export const handleFilterTasksByLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
  filterStore.setFilteredColor(e.target.value);
};