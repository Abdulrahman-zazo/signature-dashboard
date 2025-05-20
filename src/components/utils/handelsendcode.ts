import type { MessageInstance } from "antd/lib/message/interface";
import { showMessage } from "../Message/Message";
import { sendcodeAction } from "../../app/features/auth/userSlice";
import { userApi } from "../../app/features/auth/userApi";
import type { AppDispatch } from "../../app/store";
interface IProps {
  messageApi: MessageInstance;
  dispatch: AppDispatch;
  email: string;
}
export const handelsendcode = async ({
  messageApi,
  email,
  dispatch,
}: IProps) => {
  try {
    showMessage({
      messageApi,
      type: "loading",
      content: "جاري إرسال كود التحقق ...",
      duration: 4,
    });

    const result = await dispatch(
      userApi.endpoints.forgetpassword.initiate(email)
    ).unwrap();
    console.log(result);

    if (result?.status === true) {
      showMessage({
        messageApi,
        type: "success",
        content: result?.msg,
      });
      // 2- Using result.data.user because data from useLoginMutation in initial undefined then its return error message.
      setTimeout(() => dispatch(sendcodeAction()), 500);
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
