import { Link, useNavigate } from "react-router-dom";

import loginImage from "../../../assets/loginpage.png";
import { Button, Form, Input, message, Spin } from "antd";

import Logo from "../../../components/Ui/Logo";
import { useLoginMutation } from "../../../app/features/User/userApi";
import { useAppDispatch } from "../../../app/store";
import { loginAction } from "../../../app/features/User/userSlice";
import { encryptToken } from "../../../Cookies/CryptoServices/crypto";
import { showMessage } from "../../../components/Message/Message";
import { LoadingOutlined } from "@ant-design/icons";
interface Iuser {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const date = new Date();

  const initialValues: Iuser = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [login, { data, isLoading }] = useLoginMutation();

  const onFinish = async (values: Iuser) => {
    try {
      setTimeout(
        () =>
          showMessage({
            messageApi,
            type: "loading",
            content: "جاري تسجيل الدخول...",
            duration: 4,
          }),
        1000
      );

      const result = await login(values);
      if (result.data.status === true) {
        showMessage({
          messageApi,
          type: "success",
          content: "تم التسجيل بنجاح!",
        });
        encryptToken(data.user.token);

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        showMessage({
          messageApi,
          type: "error",
          content: result.data?.msg,
        });
      }
    } catch (err) {
      const error = err as { data?: { msg?: string } };
      showMessage({
        messageApi,
        type: "error",
        content: error.data?.msg || "حدث خطأ أثناء التسجيل",
      });
    }
  };

  return (
    <div className="flex justify-between items-center  max-[800px]:justify-center m-auto h-[100vh]">
      {contextHolder}
      <div className="w-1/2 flex flex-col  justify-center   my-4 h-full bg-background max-[800px]:hidden animate-fade-down inset-shadow-sm">
        <div className="  mx-8 my-4 ">
          <img src={loginImage} alt="Login" className="w-[90%] 2xl:w-[100%]" />
          <div>
            <h1 className="  my-2 text-text font-bold text-lg md:text-xl xl:text-3xl">
              Find your sweet home
            </h1>
            <p className="  text-gray-600 text-sm md:text-base xl:text-lg">
              Schedule visit in just a few clicks visits in just a few clicks
            </p>
          </div>
        </div>
      </div>

      {/* form side */}
      <div className="  w-2/3 h-full  max-[800px]:w-full flex flex-col justify-center items-center   ">
        <div className="w-2/3  ">
          <div className="max-[800px]:text-center  ">
            <div className="mb-8  max-[800px]:hidden ">
              <Logo type="h" width={150} />
            </div>
            <div className=" flex justify-center  min-[800px]:hidden ">
              <Logo type="v" width={150} />
            </div>
            <h1 className="text-text font-bold text-lg md:text-xl xl:text-3xl mb-2 ">
              Welcome Back!
            </h1>
            <p className="text-gray-600 text-sm md:text-base xl:text-lg mb-4 ">
              Login using your account
            </p>
          </div>
          <Form
            size="middle"
            layout="vertical"
            name="login"
            className="w-full"
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Enter your email address " />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter your password"
              />
            </Form.Item>
            <Form.Item>
              <Link to="/auth/forget-password">Forgot password</Link>
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spin size="default" indicator={<LoadingOutlined spin />} />
                ) : (
                  "Login"
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <span className="text-neutral-400 font-light text-[12px]">
          © {date.getFullYear()} Signature Company. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};
