import { Button, Flex, Popconfirm } from "antd";
import "./taskItem.styles.scss";
import {
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	UpOutlined,
} from "@ant-design/icons";
import { Task } from "../types";
import { useState } from "react";

interface TaskProps {
	task: Task;
	onDelete: (id: number) => Promise<void>;
}

const TaskItem = ({ task, onDelete }: TaskProps) => {
	const [showMore, setShowMore] = useState(false);
	return (
		<div className="task">
			<Flex justify="space-between">
				<div className="task-title">{task.title}</div>
				<Flex className="buttons" justify="flex-end" gap="small">
					{/* TODO: add modal on click */}
					<Button icon={<EditOutlined />} type="text" />
					{/* TODO: add confirmation */}
					<Popconfirm
						title="Delete the task"
						description="Are you sure to delete this task?"
						okText="Yes"
						onConfirm={() => onDelete(task.id)}
						cancelText="No"
						icon={<DeleteOutlined />}
					>
						<Button icon={<DeleteOutlined />} type="text" />
					</Popconfirm>
				</Flex>
			</Flex>
			<div className="task-description">
				{showMore ? task.description : task.description?.substring(0, 100)}
			</div>
			{(task.description?.length ?? 0) > 100 && (
				<Button
					type="text"
					icon={showMore ? <UpOutlined /> : <DownOutlined />}
					onClick={() => setShowMore(!showMore)}
				/>
			)}
		</div>
	);
};

export default TaskItem;
