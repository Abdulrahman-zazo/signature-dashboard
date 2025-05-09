import type { MessageInstance } from "antd/es/message/interface";

// رسائل التنبيه
export const showMessage = (
  messageApi: MessageInstance,
  type: "loading" | "success" | "error",
  content: string,
  duration: number = 3
) => {
  messageApi.destroy();
  messageApi[type]({ content, duration });
};
