import styled from "styled-components";
import { Observer } from "mobx-react";
import { ColorInput } from "./ColorInput";
import { useTaskForm } from "../hooks";
import { TaskColorLabels } from "./TaskColorLabels";

const Container = styled.form`
  & button {
    cursor: pointer;
  }
  .color-labels {
    margin: 12px 0;
  }
  .color-labels-text {
    margin: 12px 0;
  }
`;

const Heading = styled.p`
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

type Props = {
  onClose: AnyFunction;
  dayId: string;
  isEdit?: boolean;
  taskId?: number;
};



export const TaskForm = (props: Props) => {
  const { onClose, dayId, isEdit, taskId } = props;

  const {
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
  } = useTaskForm(onClose, dayId, isEdit, taskId);

  return (
    <Observer>
      {() => {
        return (
          <Container onSubmit={isEdit ? handleEditTask : handleSubmitTask}>
            <Heading>{isEdit ? "Edit task" : "Create a task"}</Heading>
            <div>
              <input
                required
                type="text"
                placeholder="Enter task"
                value={taskText}
                onChange={handleChangeText}
                ref={inputTextRef}
              />
            </div>
            <ColorInput
              onChange={handleChangeColor}
              value={currentColor}
              onSubmit={handleAddColor}
              buttonLabel="Add color label"
            />
            <p className="color-labels-text">Color labels:</p>
            <TaskColorLabels
              colorLabels={colorLabels}
              onClick={handleEditColor}
              isEdit
              className="color-labels"
            />
            {editableColor.color && (
              <>
                <p>Edit Color:</p>
                <ColorInput
                  onChange={handleChangeEditableColor}
                  value={editableColor.color}
                  onSubmit={handleAddEditableColor}
                  buttonLabel="Edit color"
                  onDelete={handleDeleteEditableColor}
                />
              </>
            )}
            <Controls>
              <button type="submit">
                {isEdit ? "Save Changes" : "Save Task"}
              </button>
              {isEdit && (
                <button type="button" onClick={handleDeleteTask}>
                  Delete Task
                </button>
              )}
            </Controls>
          </Container>
        );
      }}
    </Observer>
  );
};
