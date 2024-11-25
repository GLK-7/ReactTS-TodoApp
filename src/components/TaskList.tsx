import {
  Pencil,
  Trash,
  Backpack,
  Laptop,
  User,
  X,
} from '@phosphor-icons/react';
import Form from '../components/Form';
import Modal from '../components/Modal';

// React
import { useState } from 'react';

// Interface
import { ITask } from '../interfaces/Task';

interface Props {
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
}

const TaskList = ({ taskList, setTaskList }: Props) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector('#modal');
    if (display) {
      modal!.classList.remove('hidden');
    } else {
      modal!.classList.add('hidden');
    }
  };

  const handleRemoveTask = (task: ITask): void => {
    if (taskList) {
      setTaskList(
        taskList.filter((taskLn) => {
          return taskLn.id !== task.id;
        })
      );
    }
  };

  return (
    <>
      <Modal task={selectedTask} handleRemoveTask={handleRemoveTask} />
      <div className="w-full mb-8">
        <div className="text-white rounded w-full gap-4 flex flex-col">
          <h2 className="text-xl text-center font-semibold">{`Tarefas (${taskList.length})`}</h2>
          <ul className="flex flex-col gap-4">
            {taskList.map((task: ITask) => (
              <li
                key={task.id}
                className="flex bg-neutral-800 p-4 rounded shadow-md items-center"
              >
                <div className="flex gap-2 w-full">
                  {!editingTaskId || editingTaskId !== task.id ? (
                    <>
                      {task.category === 'school' && (
                        <Backpack size={22} weight="bold" />
                      )}
                      {task.category === 'work' && (
                        <Laptop size={22} weight="bold" />
                      )}
                      {!['school', 'work'].includes(task.category) && (
                        <User size={22} weight="bold" />
                      )}
                      <span className="w-full">{task.title}</span>
                    </>
                  ) : (
                    <Form
                      btnText="Salvar"
                      task={task}
                      taskList={taskList}
                      setTaskList={setTaskList}
                      setEditingTaskId={setEditingTaskId}
                    />
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      setEditingTaskId(
                        editingTaskId === task.id ? null : task.id
                      )
                    }
                  >
                    {editingTaskId === task.id ? (
                      <X
                        size={22}
                        weight="bold"
                        className="hover:text-neutral-400 transition-colors duration-200"
                        alt="Cancelar"
                      />
                    ) : (
                      <Pencil
                        size={22}
                        weight="bold"
                        className="hover:text-neutral-400 transition-colors duration-200"
                        alt="Editar tarefa"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (task) {
                        setSelectedTask(task);
                      }
                      hideOrShowModal(true);
                    }}
                  >
                    <Trash
                      size={22}
                      weight="bold"
                      className="hover:text-neutral-400 transition-colors duration-200"
                      alt="Excluir tarefa"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TaskList;
