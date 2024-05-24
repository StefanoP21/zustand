import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { devtools } from 'zustand/middleware';

interface TaskState {
  tasks: Record<string, Task>; // {[key: string]: Task }
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [['zustand/devtools', never]]> = (
  set,
  get
) => ({
  tasks: {
    '1': {
      id: '1',
      title: 'Open Task 1',
      status: 'open',
    },
    '2': {
      id: '2',
      title: 'In Progress Task 1',
      status: 'in-progress',
    },
    '3': {
      id: '3',
      title: 'Open Task 2',
      status: 'open',
    },
  },

  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId }, false, 'setDraggingTaskId');
  },

  removeDraggingTaskId() {
    set({ draggingTaskId: undefined }, false, 'removeDraggingTaskId');
  },

  changeTaskStatus(taskId: string, status: TaskStatus) {
    const task = get().tasks[taskId];
    task.status = status;

    set(
      (state) => ({
        tasks: {
          ...state.tasks,
          [taskId]: task,
        },
      }),
      false,
      'changeTaskStatus'
    );
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
