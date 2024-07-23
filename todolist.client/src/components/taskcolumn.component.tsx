import React from "react";
import { Task } from "../types";
import TaskItem from "./taskItem.component";
import "./taskcolumn.styles.scss";

interface TaskColumnProps {
	tasks: Task[];
	status: string;
	onDelete: (id: number) => Promise<void>;
	setTaskToUpdate: (task: Task) => void;
	setIsUpdateFormOpen: (arg0: boolean) => void;
	onUpdate: (task: Task) => void;
}

const TaskColumn = ({ tasks, status, onDelete, setIsUpdateFormOpen, setTaskToUpdate, onUpdate }: TaskColumnProps) => {
	function handleDragOver(e: React.DragEvent): void {
		e.preventDefault();
	}

	function handleDrop(e: React.DragEvent): void {
		let task = JSON.parse(e.dataTransfer.getData("draggedTask"));
		task.status = status;
		console.log("dropped", task);
		onUpdate(task);
	}
	return (
			<div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
			<div className="status">{status}</div>
				{tasks.map((task) => (
					<TaskItem key={task.id} task={task} onDelete={onDelete}
						setTaskToUpdate={setTaskToUpdate}
						setIsUpdateFormOpen={setIsUpdateFormOpen}
					/>
				))}
			</div>
	);
};

export default TaskColumn;
