import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./tasks.styles.scss";
import { useEffect, useState } from "react";
import { Task } from "../types";
import TaskColumn from "./taskcolumn.component";

const Tasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		// TODO: make request to backend
	}, []);

	return (
		<>
			<main className="tasks">
				<div className="tasks-head">
					<h1>Your tasks</h1>
					{ /* TODO: add modal on click */ }
					<Button type="default" icon={<PlusOutlined />}>
						Add tasks
					</Button>
				</div>
				<div className="columns">
				<TaskColumn status="To Do" tasks={tasks.filter(task => task.status === "To Do")}/>
				<TaskColumn status="In Progress" tasks={tasks.filter(task => task.status === "In Progress")}/>
				<TaskColumn status="Done" tasks={tasks.filter(task => task.status === "Done")}/>
				</div>
			</main>
		</>
	);
};

export default Tasks;
