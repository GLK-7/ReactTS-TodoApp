// React
import { useState } from 'react';

// Interface
import { ITask } from './interfaces/Task';

import './App.css';
import Form from './components/Form';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);

  return (
    <>
      <div className="bg-neutral-700 min-h-screen w-full flex flex-col items-center gap-6">
        <Navbar />
        <div className="px-4 flex flex-col w-full lg:w-[70%] gap-4">
          <div className="shadow-md">
            <Form
              setTaskList={setTaskList}
              taskList={taskList}
              btnText="Adicionar"
            />
          </div>
          {taskList.length > 0 &&<TaskList taskList={taskList} setTaskList={setTaskList} />}
        </div>
      </div>
    </>
  );
}

export default App;
