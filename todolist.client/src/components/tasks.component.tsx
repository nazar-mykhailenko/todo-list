import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./tasks.styles.scss";
import { useEffect, useState } from "react";
import { CreateTask, Task } from "../types";
import TaskColumn from "./taskcolumn.component";
import CreateForm from "./createForm.component";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      let response = await fetch("/api/tasks");
      let tasks: Task[] = await response.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  async function addTask(createTask: CreateTask): Promise<void> {
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
            onDelete={deleteTask}
            status="To Do"
            tasks={tasks.filter((task) => task.status === "To Do")}
          />
          <TaskColumn
            onDelete={deleteTask}
            status="In Progress"
            tasks={tasks.filter((task) => task.status === "In Progress")}
          />
          <TaskColumn
            onDelete={deleteTask}
            status="Done"
            tasks={tasks.filter((task) => task.status === "Done")}
          />
        </div>
      </main>
      <CreateForm
        open={isCreateFormOpen}
        onCreate={addTask}
        setOpen={setIsCreateFormOpen}
      />
    </>
  );
};

export default Tasks;
