import React, { useState } from "react";
import { tasksStore } from "../stores";
import { LABEL_COLORS } from "../constants";

export const useTaskForm = (
  onClose: AnyFunction,
  dayId: string,
  isEdit?: boolean,
  taskId?: number
) => {
  const inputTextRef = React.useRef<HTMLInputElement>(null);

  const [colorLabels, setColorLabels] = useState<string[]>([]);
  const [currentColor, setcurrentColor] = useState<string>(LABEL_COLORS[0]);
  const [editableColor, setEditableColor] = useState<{
    color: string;
    index: number | null;
  }>({ color: "", index: null });
  const [taskText, setTaskText] = useState("");

  React.useEffect(() => {
    inputTextRef.current?.focus();
    if (isEdit && taskId) {
      setColorLabels(tasksStore.getTaskColors(taskId));
      setTaskText(tasksStore.getTaskById(taskId)?.text || "");
    }
  }, [isEdit, taskId]);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcurrentColor(e.target.value);
  };

  const handleAddColor = () => {
    setColorLabels((colors) => [...colors, currentColor]);
  };

  const handleEditColor = (color: string, index: number) => {
    setEditableColor({ color, index });
  };

  const handleChangeEditableColor = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditableColor((prev) => ({ ...prev, color: e.target.value }));
  };

  const handleAddEditableColor = () => {
    setColorLabels((colors) => {
      if (editableColor.index !== null) {
        colors[editableColor.index] = editableColor.color;
      }
      return [...colors];
    });
    setEditableColor({ color: "", index: null });
  };

  const handleDeleteEditableColor = () => {
    const updatedColors = colorLabels.filter(
      (color, index) => index !== editableColor.index
    );
    setColorLabels(updatedColors);
    setEditableColor({ color: "", index: null });
  };

  const handleSubmitTask = () => {
    tasksStore.addTask({
      text: taskText,
      colorLabels: colorLabels,
      dayId,
      id: Date.now(),
    });
    onClose();
  };

  const handleEditTask = () => {
    taskId &&
      tasksStore.editTask(taskId, {
        text: taskText,
        colorLabels: colorLabels,
        dayId,
        id: taskId,
      });
    onClose();
  };

  const handleDeleteTask = () => {
    taskId && tasksStore.deleteTask(taskId);
    onClose();
  };

  return {
    colorLabels,
    currentColor,
    editableColor,
    taskText,
    inputTextRef,
    handleChangeText,
    handleChangeColor,
    handleAddColor,
    handleEditColor,
    handleChangeEditableColor,
    handleAddEditableColor,
    handleDeleteEditableColor,
    handleSubmitTask,
    handleEditTask,
    handleDeleteTask,
  };
};