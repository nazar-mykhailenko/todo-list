import React from "react";
import { Task } from "../types";
import TaskItem from "./taskItem.component";
import "./taskcolumn.styles.scss";
import todoStore from "../stores/todoStore";
import { observer } from "mobx-react-lite";

interface TaskColumnProps {
  status: string;
}

const TaskColumn = observer(({ status }: TaskColumnProps) => {
  function handleDragOver(e: React.DragEvent): void {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent): void {
    let task: Task = JSON.parse(e.dataTransfer.getData("draggedTask"));
    task.status = status;
    console.log("dropped", task);
    todoStore.updateTask(task);
  }
  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="status">{status}</div>
      {todoStore.tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </div>
  );
});

export default TaskColumn;
