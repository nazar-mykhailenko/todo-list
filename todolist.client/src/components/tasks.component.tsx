import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./tasks.styles.scss";
import TaskColumn from "./taskcolumn.component";
import CreateForm from "./createForm.component";
import UpdateForm from "./updateForm.component";
import todoStore from "../stores/todoStore";
import { observer } from "mobx-react-lite";

const Tasks = observer(() => {
  return (
    <>
      <main className="tasks">
        <div className="tasks-head">
          <h1>Your tasks</h1>
          <Button
            type="default"
            onClick={() => (todoStore.isCreateFormOpen = true)}
            icon={<PlusOutlined />}
          >
            Add tasks
          </Button>
        </div>
        <div className="columns">
          <TaskColumn status="To Do" />
          <TaskColumn status="In Progress" />
          <TaskColumn status="Done" />
        </div>
      </main>
      <CreateForm />
      <UpdateForm />
    </>
  );
});

export default Tasks;
