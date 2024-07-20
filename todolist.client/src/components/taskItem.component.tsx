import { Button, Flex } from "antd";
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
}

const TaskItem = ({ task }: TaskProps) => {
	const [showMore, setShowMore] = useState(false);
	return (
		<div className="task">
			<Flex justify="space-between">
				<div className="task-title">{task.title}</div>
				<Flex className="buttons" justify="flex-end" gap="small">
					{ /* TODO: add modal on click */ }
					<Button icon={<EditOutlined />} type="text" />
					{/* TODO: add confirmation */ }
					<Button icon={<DeleteOutlined />} type="text" />
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
