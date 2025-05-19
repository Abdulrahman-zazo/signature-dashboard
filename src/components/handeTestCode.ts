import type { MessageInstance } from "antd/lib/message/interface";
import { showMessage } from "./Message/Message";
import { verificationCodeAction } from "../app/features/User/userSlice";
import { userApi } from "../app/features/User/userApi";
import type { AppDispatch } from "../app/store";
interface IProps {
  messageApi: MessageInstance;
  dispatch: AppDispatch;
  email: string;
  code: number;
}
export const handelTestCode = async ({
  messageApi,
  email,
  code,
  dispatch,
}: IProps) => {
  try {
    showMessage({
      messageApi,
      type: "loading",
      content: "جاري التحقق من الكود",
      duration: 4,
    });

    const result = await dispatch(
      userApi.endpoints.testCode.initiate({ email, code })
    ).unwrap();

    if (result?.status === true) {
      showMessage({
        messageApi,
        type: "success",
        content: result?.msg,
      });
      // 2- Using result.data.user because data from useLoginMutation in initial undefined then its return error message.
      setTimeout(() => dispatch(verificationCodeAction({ code })), 500);
    } else {
      showMessage({
        messageApi,
        type: "error",
        content: result?.msg,
      });
    }
  } catch (err) {
    const error = err as { data?: { msg?: string } };
    showMessage({
      messageApi,
      type: "error",
      content: error.data?.msg || "حدث خطأ أثناء الاتصال بالخادم",
    });
  }
};
