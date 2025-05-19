import { Link, useNavigate } from "react-router-dom";
import forgetpage from "../../../assets/forgetpage.png";
import { Button, Form, Input, message } from "antd";
import Logo from "../../../components/Ui/Logo";
import { Mail } from "lucide-react";
import { handelsendcode } from "../../../components/handelsendcode";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/store";
import { handelTestCode } from "../../../components/handeTestCode";
import { useState } from "react";
import { handelNewPassword } from "../../../components/handelNewPassword";

interface IProps {
  email: string;
  password: string;
  confirmation: string;
  code?: number;
}

const ForgetPassword = () => {
  const [email_veri, setemail] = useState("");
  const { code: final_code, is_send } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const date = new Date();

  // 1- Initial values for forget password form.
  const initialValues: IProps = {
    email: "",
    password: "",
    confirmation: "",
    code: undefined,
  };

  // const handeltestcode = async (values: IProps) => {
  //   try {
  //     showMessage({
  //       messageApi,
  //       type: "loading",
  //       content: "جاري تسجيل الدخول...",
  //       duration: 4,
  //     });

  //     const result = await forgetpassword(values);

  //     if (result.data.status === true) {
  //       showMessage({
  //         messageApi,
  //         type: "success",
  //         content: result.data?.msg,
  //       });
  //       // 2- Using result.data.user because data from useLoginMutation in initial undefined then its return error message.
  //       setTimeout(() => setshowinputCode(true), 500);
  //     } else {
  //       showMessage({
  //         messageApi,
  //         type: "error",
  //         content: result.data?.msg,
  //       });
  //     }
  //   } catch (err) {
  //     const error = err as { data?: { msg?: string } };
  //     showMessage({
  //       messageApi,
  //       type: "error",
  //       content: error.data?.msg || "حدث خطأ أثناء الاتصال بالخادم",
  //     });
  //   }
  // };
  return (
    <div className="flex justify-between items-center  max-[800px]:justify-center m-auto h-[100vh]">
      {contextHolder}
      <div className="w-1/2 flex flex-col  justify-center  my-4 h-full bg-background max-[800px]:hidden animate-fade-down inset-shadow-sm">
        <div className="  mx-8 my-4 ">
          <img src={forgetpage} alt="Login" className="w-[90%] 2xl:w-[100%]" />

          <p className="  text-gray-500 text-[14px] my-2 w-[70%]  ">
            Enter the email address associated with your account and we'll send
            you a secure link to reset your password.
          </p>
          <span className="text-neutral-400 font-light text-[12px]">
            © {date.getFullYear()} Signature Company. All Rights Reserved.
          </span>
        </div>
      </div>

      {/* Form side */}
      <div className="w-2/3  max-[800px]:w-full flex flex-col justify-center items-center  ">
        <div className="w-2/3  ">
          <div className="max-[800px]:text-center  ">
            <div className="mb-8  max-[800px]:hidden ">
              <Logo type="h" width={150} />
            </div>
            <div className=" flex justify-center  min-[800px]:hidden ">
              <Logo type="v" width={150} />
            </div>
            <h1 className="text-text font-bold text-lg md:text-xl xl:text-3xl mb-2 ">
              Reset Password
            </h1>
            <p className=" text-gray-600 text-sm md:text-base xl:text-lg mb-4 ">
              Enter your email account to rest your password
            </p>
          </div>
          {!is_send && (
            <Form
              size="middle"
              layout="vertical"
              name="forgetpassword"
              className="w-full"
              initialValues={initialValues}
              onFinish={(values) => {
                setemail(values?.email);
                handelsendcode({
                  messageApi,
                  email: values?.email,
                  dispatch,
                });
              }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<Mail />}
                  placeholder="Enter your email address "
                />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  {/* {isLoading_Forgetpassword ? (
                  <Spin size="default" indicator={<LoadingOutlined spin />} />
                ) : (
                  "Send code"
                )} */}
                  Send
                </Button>
              </Form.Item>
              <div className="text-gray-600">
                Already remember your password?
                <Link
                  to="/auth/login"
                  className="text-primary hover:text-primary-500 mx-2"
                >
                  Login Here
                </Link>
              </div>
            </Form>
          )}
          {is_send && !final_code && (
            <div className="flex flex-col items-center w-full mt-8">
              <Form
                size="large"
                layout="vertical"
                name="testcode"
                initialValues={initialValues}
                onFinish={(values) => {
                  handelTestCode({
                    code: values?.code,
                    email: email_veri,
                    messageApi,
                    dispatch,
                  });
                }}
              >
                <Form.Item
                  label="Verifecation Code"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Please input your verification code!",
                    },
                    {
                      pattern: /^\d+$/,
                      message: "Only numbers are allowed!",
                    },
                  ]}
                >
                  <Input.OTP
                    length={4}
                    size="large"
                    className="flex justify-between w-full"
                  />
                </Form.Item>

                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    {/* {isLoading_Forgetpassword ? (
                    <Spin size="default" indicator={<LoadingOutlined spin />} />
                  ) : (
                    "Send code"
                  )} */}
                    change password
                  </Button>
                </Form.Item>
                <div className="text-gray-600">
                  Already remember your password?
                  <Link
                    to="/auth/login"
                    className="text-primary hover:text-primary-500 mx-2"
                  >
                    Login Here
                  </Link>
                </div>
                <div className="text-gray-600 mt-2">
                  Didn't receive the code?
                  <Button
                    type="text"
                    onClick={() => {
                      handelsendcode({
                        messageApi,
                        email: email_veri,
                        dispatch,
                      });
                    }}
                    className="text-primary hover:text-primary-500 mx-2"
                  >
                    Resend it.
                  </Button>
                </div>
              </Form>
            </div>
          )}
          {final_code && (
            <div className="flex flex-col items-center w-full mt-8">
              <Form
                size="large"
                layout="vertical"
                name="testcode"
                initialValues={initialValues}
                onFinish={(values) => {
                  handelNewPassword({
                    password: values.password,
                    confirmationpassword: values.confirmation,
                    email: email_veri,
                    messageApi,
                    dispatch,
                    navigate,
                  });
                }}
              >
                <Form.Item
                  label="New Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
                  name="confirmation"
                  dependencies={["new_password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("new_password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    {/* {isLoading_Forgetpassword ? (
                    <Spin size="default" indicator={<LoadingOutlined spin />} />
                  ) : (
                    "Send code"
                  )} */}
                    Save
                  </Button>
                </Form.Item>
                <div className="text-gray-600">
                  Already remember your password?
                  <Link
                    to="/auth/login"
                    className="text-primary hover:text-primary-500 mx-2"
                  >
                    Login Here
                  </Link>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
