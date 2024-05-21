import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';

interface TaskState {
  tasks: Record<string, Task>; // {[key: string]: Task }

  getTaskByStatus: (status: TaskStatus) => Task[];
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    '1': {
      id: '1',
      title: 'Task 1',
      status: 'open',
    },
    '2': {
      id: '2',
      title: 'Task 2',
      status: 'in-progress',
    },
    '3': {
      id: '3',
      title: 'Task 3',
      status: 'done',
    },
  },

  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },
});

export const useTaskStore = create<TaskState>()(storeApi);
