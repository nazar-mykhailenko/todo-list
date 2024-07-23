import { Button, Flex, Popconfirm } from "antd";
import "./taskItem.styles.scss";
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  QuestionCircleTwoTone,
  UpOutlined,
} from "@ant-design/icons";
import { Task } from "../types";
import { useState } from "react";

interface TaskProps {
  task: Task;
  onDelete: (id: number) => Promise<void>;
  setTaskToUpdate: (task: Task) => void;
  setIsUpdateFormOpen: (arg0: boolean) => void;
}

const TaskItem = ({
  task,
  onDelete,
  setTaskToUpdate,
  setIsUpdateFormOpen,
}: TaskProps) => {
  const [showMore, setShowMore] = useState(false);

  function getIcon(): JSX.Element {
    switch (task.status) {
      case "To Do":
        return <CloseCircleTwoTone twoToneColor="#eb2f96" />;
      case "In Progress":
        return <ClockCircleTwoTone />;
      case "Done":
        return <CheckCircleTwoTone twoToneColor="#52c41a" />;
      default:
        return <QuestionCircleTwoTone />;
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.dataTransfer.clearData();
    e.dataTransfer.setData("draggedTask", JSON.stringify(task));
  };

  return (
    <div
      className="task"
      draggable
      onDragStart={handleDragStart}
    >
      <Flex justify="space-between">
        <div className="task-title">{task.title}</div>
        <Flex className="buttons" justify="flex-end" gap="small">
          {/* TODO: add modal on click */}
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => {
              setTaskToUpdate(task);
              setIsUpdateFormOpen(true);
            }}
          />
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
      <Flex gap="small" justify="space-between">
        <Flex gap="small" justify="flex-start" align="center">
          {getIcon()}
          <div>{task.status}</div>
        </Flex>
        {(task.description?.length ?? 0) > 100 && (
          <Button
            type="text"
            icon={showMore ? <UpOutlined /> : <DownOutlined />}
            onClick={() => setShowMore(!showMore)}
          />
        )}
      </Flex>
    </div>
  );
};

export default TaskItem;
