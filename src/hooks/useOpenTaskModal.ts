import React from "react";

export const useOpenTaskModal = () => {
  
  const [openCreateTaskModal, setOpenCreateTaskModal] = React.useState<boolean>(false);
  const [openUpdateTaskModal, setOpenUpdateTaskModal] = React.useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });

  const handleOpenTaskCreateModal = () => {
    setOpenCreateTaskModal(true);
  };

  const handleCloseCreateTaskModal = () => {
    setOpenCreateTaskModal(false);
  };

  const handleOpenTaskUpdateModal = React.useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    e.stopPropagation();
    setOpenUpdateTaskModal({ open: true, id: taskId });
  }, []);

  const handleCloseUpdateTaskModal = () => {
    setOpenUpdateTaskModal({ open: false, id: null });
  };

  return { openCreateTaskModal, openUpdateTaskModal, handleOpenTaskCreateModal, handleCloseCreateTaskModal, handleOpenTaskUpdateModal, handleCloseUpdateTaskModal }
}