import { useForms } from '../hooks/useForms';
import { FormSchema } from '../schemas/formSchema';

import { Plus, FloppyDisk } from '@phosphor-icons/react';

// Interface
import { ITask } from '../interfaces/Task';

interface Props {
  taskList?: ITask[] | undefined;
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  setEditingTaskId?: React.Dispatch<React.SetStateAction<ITask[]>>;
  btnText: string;
  task?: ITask;
}

const Form = ({
  setTaskList,
  taskList,
  btnText,
  task,
  setEditingTaskId,
}: Props) => {
  const { register, handleSubmit, errors, reset } = useForms();
  const categories: any = [
    { id: 'work', text: 'Trabalho' },
    { id: 'school', text: 'Escola' },
    { id: 'personal', text: 'Pessoal' },
  ];

  const onSubmit = (data: FormSchema) => {
    const { title, category } = data;
    console.log('Lista', taskList);

    if (task) {
      // Atualização da tarefa existente
      const updatedTask: ITask = { ...task, title, category }; // Atualiza os valores da tarefa
      const updatedTaskList = taskList?.map(
        (t) => (t.id === task.id ? updatedTask : t) // Substitui a tarefa correspondente
      );

      setTaskList?.(updatedTaskList ?? []); // Atualiza a lista de tarefas no estado
      console.log('Lista atualizada', updatedTaskList);
    } else {
      // Adição de nova tarefa
      const id = Math.floor(Math.random() * 1000);
      const newTask: ITask = { id, title, category };

      setTaskList?.([...(taskList ?? []), newTask]);
    }

    reset(); // Limpa o formulário
    setEditingTaskId?.(null);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-neutral-800 p-4 rounded border-slate-300 text-white gap-4 items-top flex flex-wrap"
      >
        <div className="flex flex-col w-full">
          <input
            type="text"
            id="title"
            {...register('title')}
            placeholder="Digite o título da tarefa"
            defaultValue={task?.title}
            className="h-10 pl-2 rounded border border-neutral-700 bg-neutral-700"
          />
          {errors.title && (
            <small className="text-red-500 italic">
              {errors.title.message}
            </small>
          )}
        </div>

        <div className="flex flex-col">
          <select
            id="category"
            {...register('category')}
            defaultValue={task?.category || 'select'} // Define o valor inicial
            className="h-10 pl-1 rounded border border-neutral-700 bg-neutral-700"
          >
            <option value="select" disabled>
              Selecione
            </option>
            {categories.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
          {errors.category && (
            <small className="text-red-500 italic">
              {errors.category.message}
            </small>
          )}
        </div>
        <button
          type="submit"
          className="w-32 h-10 bg-neutral-700 rounded hover:bg-neutral-500 transition-all px-2 flex items-center gap-2"
        >
          {btnText === 'Salvar' ? (
            <FloppyDisk size={16} weight="bold" alt="Salvar tarefa" />
          ) : (
            <Plus size={14} weight="bold" alt="Adicionar tarefa" />
          )}
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default Form;
