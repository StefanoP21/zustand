import { DragEvent, useState } from 'react';
import Swal from 'sweetalert2';

import { useTaskStore } from '../stores';
import { type TaskStatus } from '../interfaces';

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: 'Nueva Tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Escribe el nombre de la tarea',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      inputValidator(value) {
        if (!value) {
          return 'Debes ingresar un nombre para la tarea';
        }
      },
    });

    if (!isConfirmed) return;

    addTask(value, status);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return {
    //* Properties
    onDragOver,
    isDragging,

    //* Methods
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
