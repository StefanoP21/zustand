import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {
  const inProgressTasks = useTaskStore((state) =>
    state.getTaskByStatus('in-progress')
  );
  const openTasks = useTaskStore((state) => state.getTaskByStatus('open'));
  const dondeTasks = useTaskStore((state) => state.getTaskByStatus('done'));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" value="open" tasks={openTasks} />

        <JiraTasks
          title="Avanzando"
          value="in-progress"
          tasks={inProgressTasks}
        />

        <JiraTasks title="Terminadas" value="done" tasks={dondeTasks} />
      </div>
    </>
  );
};
