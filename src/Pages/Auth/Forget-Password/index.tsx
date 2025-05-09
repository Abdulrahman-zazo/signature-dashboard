import { Link } from "react-router-dom";

import forgetpage from "../../../assets/forgetpage.png";
import { Button, Form, Input } from "antd";

import Logo from "../../../components/Ui/Logo";

interface IProps {
  email: string;
}

const ForgetPassword = () => {
  const date = new Date();
  const initialValues: IProps = {
    email: "",
  };

  const onFinish = (values: IProps) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="flex justify-between items-center  max-[800px]:justify-center m-auto h-[100vh]">
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

      {/* form side */}
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
              <Input
                // prefix={<Mail />}
                placeholder="Enter your email address "
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
          <div className="text-gray-600">
            Already remember your password?
            <Link
              to="/auth/login"
              className="text-primary hover:text-primary-500 mx-2"
            >
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
