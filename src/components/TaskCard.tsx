import styled from "styled-components";
import { TaskColorLabels } from "./TaskColorLabels";
import { dragTasksStore } from "../stores";
import { Observer } from "mobx-react";
import { memo } from "react";
import {
  handleTaskDragEnd,
  handleTaskDragOver,
  handleTaskDragStart,
  handleTaskDrageLeave,
  handleTaskDrop,
} from "../actions";

const TaskContainer = styled.div`
  background-color: #fbfbfb;
  box-shadow: 0px 4px 8px rgba(173, 151, 151, 0.3);
  padding: 5px;
  margin-right: 5px;
  font-size: 12px;
  border-radius: 2px;
  cursor: grab;
  .text {
    margin-top: 7px;
  }
`;

type Props = {
  onEdit: AnyFunction;
  currentTask: Task;
}

export const TaskCard = memo((props: Props) => {
  const { onEdit, currentTask } = props;

  return (
    <Observer>
      {() => {
        const dragTask = dragTasksStore.draggableTask;
        return (
          <TaskContainer
            onDoubleClick={(e) => onEdit(e, currentTask.id)}
            draggable={true}
            onDragStart={(e) => handleTaskDragStart(e, currentTask)}
            onDragEnd={handleTaskDragEnd}
            onDragLeave={handleTaskDrageLeave}
            onDragOver={(e) => handleTaskDragOver(e, dragTask, currentTask)}
            onDrop={(e) => handleTaskDrop(e, dragTask, currentTask)}
          >
            <TaskColorLabels colorLabels={currentTask.colorLabels} />
            <div className="text">{currentTask.text}</div>
          </TaskContainer>
        );
      }}
    </Observer>
  );
});
