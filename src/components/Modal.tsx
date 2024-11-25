// Interface
import { ITask } from '../interfaces/Task';

interface Props {
  handleRemoveTask(task: ITask): void;
  task?: ITask | null;
}

const Modal = ({ task, handleRemoveTask }: Props) => {
  const closeModal = (): void => {
    console.log(task);
    const modal = document.querySelector('#modal');
    modal!.classList.add('hidden');
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 hidden bg-black/50 z-50 h-screen w-screen top-0 left-0 flex items-center justify-center"
      onClick={closeModal}
    >
      <div className="flex flex-col p-4 sm:w-[400px] w-[90%] h-1/4 bg-neutral-700 text-white rounded justify-between items-center">
        <div className="h-32 flex items-center text-center">
          <span>{`Tem certeza que deseja excluir a tarefa "${task?.title}"?`}</span>
        </div>
        <div className="flex w-full flex-row justify-between items-center">
          <button className="w-[120px] h-8 bg-neutral-800 hover:bg-neutral-900 rounded">
            Não
          </button>
          <button
            className="w-[120px] h-8 bg-red-900 hover:bg-red-950 rounded"
            onClick={() => {
              if (task) {
                handleRemoveTask(task);
              }
            }}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
