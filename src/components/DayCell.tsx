import * as React from "react";
import styled, { css } from "styled-components";
import { TaskCard } from "./TaskCard";
import { dragTasksStore, filterStore, tasksStore } from "../stores";
import { Observer } from "mobx-react";
import Modal from "./Modal";
import { TaskForm } from "./TaskForm";
import { useOpenTaskModal } from "../hooks";
import { handleDayDragOver, handleDayDrop } from "../actions";

const DayCellContainer = styled.div<{ isDisabled: boolean, isToday: boolean }>`
  padding: 4px;
  width: 100%;
  height: 100px;
  overflow: auto;
  background-color: ${({ isDisabled }) => (isDisabled ? "#e6e5e5" : "#f0f0f0")};
  cursor: pointer;
  ${(props) => props.isDisabled && "pointer-events: none"};
  border: 1px solid #ccc;
  .heading {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 5px;
    .holiday {
      font-size: 12px;
    }
  }
  .tasks-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .day-of-month {
    ${props => props.isToday && todayStyles}
  }
`;

const todayStyles = css`
  background-color: red;
  padding: 4px;
  border-radius: 50%;
  color: white;
`

type Props = {
  dayOfMonth: number;
  isDisabled: boolean;
  dayId: string;
  holiday?: string;
  isToday: boolean
};

function DayCell(props: Props) {
  const { dayOfMonth, isDisabled, dayId, holiday, isToday } = props;

  const {
    openCreateTaskModal,
    openUpdateTaskModal,
    handleOpenTaskCreateModal,
    handleCloseCreateTaskModal,
    handleOpenTaskUpdateModal,
    handleCloseUpdateTaskModal,
  } = useOpenTaskModal();

  return (
    <Observer>
      {() => {
        const dragTask = dragTasksStore.draggableTask;
        const tasks = tasksStore.getTasksForCurrentDay(dayId);
        const filteredTasks = filterStore.getFilteredTasksByDay(dayId);
        const tasksForCalendar = filterStore.isFiltering
          ? filteredTasks
          : tasks;

        return (
          <DayCellContainer
            isToday={isToday}
            isDisabled={isDisabled}
            onDoubleClick={handleOpenTaskCreateModal}
            onDragOver={handleDayDragOver}
            onDrop={(e) => handleDayDrop(e, dragTask, dayId)}
          >
            <div className="heading">
              <span className="day-of-month">{dayOfMonth}</span>
              <span className="holiday">{holiday}</span>
            </div>
            <div className="tasks-wrapper">
              <Modal
                isOpen={openCreateTaskModal}
                onClose={handleCloseCreateTaskModal}
              >
                {openCreateTaskModal && (
                  <TaskForm
                    onClose={handleCloseCreateTaskModal}
                    dayId={dayId}
                  />
                )}
              </Modal>
              <Modal
                isOpen={openUpdateTaskModal.open}
                onClose={handleCloseUpdateTaskModal}
              >
                {openUpdateTaskModal.open && (
                  <TaskForm
                    onClose={handleCloseUpdateTaskModal}
                    dayId={dayId}
                    taskId={openUpdateTaskModal.id as number}
                    isEdit
                  />
                )}
              </Modal>
              {tasksForCalendar &&
                tasksForCalendar.map((task) => {
                  return (
                    <TaskCard
                      currentTask={task}
                      onEdit={handleOpenTaskUpdateModal}
                    />
                  );
                })}
            </div>
          </DayCellContainer>
        );
      }}
    </Observer>
  );
}

export default React.memo(DayCell);
