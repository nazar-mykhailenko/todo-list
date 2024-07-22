import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CreateTask } from "../types";

interface CreateFormProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
	onCreate: (task: CreateTask) => Promise<void>;
}

const CreateForm = ({ open, setOpen, onCreate }: CreateFormProps) => {

	const onFinish = (task: CreateTask) => {
		onCreate(task);

		setOpen(false);
	}

  return (
    <Modal
      title="Add task"
      open={open}
      okType="default"
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the task title" }]}
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
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
