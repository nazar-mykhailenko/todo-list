import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UpsertTask } from "../types";
import todoStore from "../stores/todoStore";
import { observer } from "mobx-react-lite";

const UpdateForm = observer(() => {
  const [form] = Form.useForm();
  form.setFieldsValue({ ...todoStore.tasksToUpdate });

  const onFinish = (task: UpsertTask) => {
    todoStore.updateTask({
      ...task,
      id: todoStore.tasksToUpdate.id,
    });

    todoStore.isUpdateFormOpen = false;
    form.resetFields();
  };

  const handleCancel = () => {
    todoStore.isUpdateFormOpen = false;
    form.resetFields();
  };

  return (
    <Modal
      title="Add task"
      open={todoStore.isUpdateFormOpen}
      onCancel={handleCancel}
      okType="default"
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Title must be from 3 to 50 characters long",
              min: 3,
              max: 50,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please enter the task status" }]}
        >
          <Select
            options={[
              { value: "To Do", label: "To Do" },
              { value: "In Progress", label: "In Progress" },
              { value: "Done", label: "Done" },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default UpdateForm;
