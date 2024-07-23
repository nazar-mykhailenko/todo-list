import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./tasks.styles.scss";
import { useEffect, useState } from "react";
import { UpsertTask, Task } from "../types";
import TaskColumn from "./taskcolumn.component";
import CreateForm from "./createForm.component";
import UpdateForm from "./updateForm.component";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

	const [taskToUpdate, setTaskToUpdate] = useState<Task>({id: 0, title: '', status: ''});
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      let response = await fetch("/api/tasks");
      let tasks: Task[] = await response.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  async function addTask(createTask: UpsertTask): Promise<void> {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTask),
    });

    const task: Task = await response.json();
    console.log(task);

    if (response.ok) {
      message.success("Task successfully added");
      setTasks((tasks) => {
        tasks.push(task);
        return [...tasks];
      });
    } else {
      message.error("Something went wrong");
    }
  }

	async function updateTask(task: Task): Promise<void> {
		const response = await fetch('/api/tasks', {
			method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
		});

    if (response.ok) {
      message.success("Task successfully updated");
      setTasks((tasks) => {
				const index = tasks.findIndex((t) => t.id === task.id);
				tasks[index] = task;
        return [...tasks];
      });
    } else {
      message.error("Something went wrong");
    }
		
	}

  async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

    if (response.ok) {
      message.success("Task successfully deleted");
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    } else {
      message.error("Something went wrong");
    }
  }

  return (
    <>
      <main className="tasks">
        <div className="tasks-head">
          <h1>Your tasks</h1>
          <Button
            type="default"
            onClick={() => setIsCreateFormOpen(true)}
            icon={<PlusOutlined />}
          >
            Add tasks
          </Button>
        </div>
        <div className="columns">
          <TaskColumn
						onUpdate={updateTask}
            onDelete={deleteTask}
            status="To Do"
            tasks={tasks.filter((task) => task.status === "To Do")}
						setTaskToUpdate={setTaskToUpdate}
						setIsUpdateFormOpen={setIsUpdateFormOpen}
          />
          <TaskColumn
						onUpdate={updateTask}
            onDelete={deleteTask}
            status="In Progress"
            tasks={tasks.filter((task) => task.status === "In Progress")}
						setTaskToUpdate={setTaskToUpdate}
						setIsUpdateFormOpen={setIsUpdateFormOpen}
          />
          <TaskColumn
						onUpdate={updateTask}
            onDelete={deleteTask}
            status="Done"
            tasks={tasks.filter((task) => task.status === "Done")}
						setTaskToUpdate={setTaskToUpdate}
						setIsUpdateFormOpen={setIsUpdateFormOpen}
          />
        </div>
      </main>
      <CreateForm
        open={isCreateFormOpen}
        onCreate={addTask}
        setOpen={setIsCreateFormOpen}
      />
			<UpdateForm 
				open={isUpdateFormOpen}
				setOpen={setIsUpdateFormOpen}
				taskToUpdate={taskToUpdate}
				onUpdate={updateTask}
			/>
    </>
  );
};

export default Tasks;
