import type { MessageInstance } from "antd/lib/message/interface";
import { showMessage } from "../Message/Message";
import { userApi } from "../../app/features/auth/userApi";
import type { AppDispatch } from "../../app/store";
import type { NavigateFunction } from "react-router-dom";

interface IProps {
  messageApi: MessageInstance;
  email: string;
  password: string;
  confirmationpassword: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}
export const handelNewPassword = async ({
  messageApi,
  email,
  password,
  confirmationpassword,
  dispatch,
  navigate,
}: IProps) => {
  try {
    showMessage({
      messageApi,
      type: "loading",
      content: "جاري تغيير كلمة المرور ",
      duration: 4,
    });

    const result = await dispatch(
      userApi.endpoints.changepassword.initiate({
        email,
        password,
        confirmationpassword,
      })
    ).unwrap();

    if (result?.status === true) {
      showMessage({
        messageApi,
        type: "success",
        content: result?.msg,
      });
      // 2- Using result.data.user because data from useLoginMutation in initial undefined then its return error message.
      setTimeout(() => {
        window.location.reload();
      }, 500);
      navigate("/auth/login");
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
