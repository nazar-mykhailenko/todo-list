import { makeAutoObservable } from "mobx";
import { Task, UpsertTask } from "../types";
import { message } from "antd";

const apiUrl =
  import.meta.env.VITE_API_URL ?? "http://localhost:5001/api/tasks";

class TodoStore {
  tasks: Task[] = [];
  tasksToUpdate: Task = { id: 0, title: "", status: "" };
  isCreateFormOpen: boolean = false;
  isUpdateFormOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
		this.getAll();
  }

  async getAll() {
    let response = await fetch(apiUrl);
    this.tasks = await response.json();
  }

  async addTask(createTask: UpsertTask) {
    const response = await fetch(apiUrl, {
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
			this.tasks.push(task);
    } else {
      message.error("Something went wrong");
    }
  }

	async updateTask(task: Task) {
		const response = await fetch(apiUrl, {
			method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
		});

    if (response.ok) {
      message.success("Task successfully updated");
				const index = this.tasks.findIndex((t) => t.id === task.id);
				this.tasks[index] = task;
    } else {
      message.error("Something went wrong");
    }

	}

  async deleteTask(id: number) {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

    if (response.ok) {
      message.success("Task successfully deleted");
      this.tasks.filter((task) => task.id !== id);
    } else {
      message.error("Something went wrong");
    }
  }

}

export default new TodoStore();
