import { Popconfirm } from "antd";

export default function CustomConfirm({
  title = "Are You Sure?",
  description,
  handleOk,
  children,
}) {
  return (
    <Popconfirm
      okButtonProps={{ style: { backgroundColor: "#4C9A29", color: "white" } }}
      title={title}
      description={description}
      onConfirm={handleOk}
    >
      {children}
    </Popconfirm>
  );
}
