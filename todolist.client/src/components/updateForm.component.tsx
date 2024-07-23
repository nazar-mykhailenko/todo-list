import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Task, UpsertTask } from "../types";

interface UpdateFormProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  onUpdate: (task: Task) => Promise<void>;
  taskToUpdate: Task;
}

const UpdateForm = ({
  open,
  setOpen,
  onUpdate,
  taskToUpdate,
}: UpdateFormProps) => {
  const [form] = Form.useForm();
	form.setFieldsValue({...taskToUpdate});

  const onFinish = (task: UpsertTask) => {
    onUpdate({
      ...task,
      id: taskToUpdate.id,
    });

    setOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add task"
      open={open}
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
};

export default UpdateForm;
