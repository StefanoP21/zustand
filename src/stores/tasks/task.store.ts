import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';

import { Task, TaskStatus } from '../../interfaces';

interface TaskState {
  tasks: Record<string, Task>; // {[key: string]: Task }
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
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

  getTaskByStatus: (status) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },

  addTask(title, status) {
    const newTask: Task = { id: uuidv4(), title, status: status };

    set(
      produce((state: TaskState) => {
        state.tasks[newTask.id] = newTask;
      }),
      false,
      'addTask'
    );

    // set(
    //   (state) => ({
    //     tasks: {
    //       ...state.tasks,
    //       [newTask.id]: newTask,
    //     },
    //   }),
    //   false,
    //   'addTask'
    // );
  },

  setDraggingTaskId: (taskId) => {
    set({ draggingTaskId: taskId }, false, 'setDraggingTaskId');
  },

  removeDraggingTaskId() {
    set({ draggingTaskId: undefined }, false, 'removeDraggingTaskId');
  },

  changeTaskStatus(taskId, status) {
    const task = get().tasks[taskId];
    console.log(task);
    task.status = status;

    set(
      produce((state: TaskState) => {
        state.tasks[taskId] = task;
      }),
      false,
      'changeTaskStatus'
    );

    // set(
    //   (state) => ({
    //     tasks: {
    //       ...state.tasks,
    //       [taskId]: task,
    //     },
    //   }),
    //   false,
    //   'changeTaskStatus'
    // );
  },

  onTaskDrop(status) {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
