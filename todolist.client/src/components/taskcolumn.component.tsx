import { Task } from "../types";
import TaskItem from "./taskItem.component";
import "./taskcolumn.styles.scss";

interface TaskColumnProps {
	tasks: Task[];
	status: string;
	onDelete: (id: number) => Promise<void>;
}

const TaskColumn = ({ tasks, status, onDelete }: TaskColumnProps) => {
	return (
		<>
			<div className="column">
			<div className="status">{status}</div>
				{tasks.map((task) => (
					<TaskItem key={task.id} task={task} onDelete={onDelete}/>
				))}
			</div>
		</>
	);
};

export default TaskColumn;
