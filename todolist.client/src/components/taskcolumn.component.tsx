import { Task } from "../types";
import TaskItem from "./taskItem.component";
import "./taskcolumn.styles.scss";

interface TaskColumnProps {
	tasks: Task[];
	status: string;
}

const TaskColumn = ({ tasks, status }: TaskColumnProps) => {
	return (
		<>
			<div className="status">{status}</div>
			<div className="column">
				{tasks.map((task) => (
					<TaskItem task={task} />
				))}
			</div>
		</>
	);
};

export default TaskColumn;
