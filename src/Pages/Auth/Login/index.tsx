import { Link } from "react-router-dom";

import loginImage from "../../../assets/loginpage.png";
import { Button, Form, Input } from "antd";

import Logo from "../../../components/Ui/Logo";
import { useLoginMutation } from "../../../app/features/User/userApi";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { loginAction } from "../../../app/features/User/userSlice";
import {
  decryptToken,
  encryptToken,
} from "../../../Cookies/CryptoServices/crypto";
import { cookieService } from "../../../Cookies/CookiesServices";

interface Iuser {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const date = new Date();

  const initialValues: Iuser = {
    email: "",
    password: "",
  };
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [login] = useLoginMutation();
  // { isLoading, isError, data, error }
  const onFinish = async (values: Iuser) => {
    const res = await login(values);
    console.log(res.data.user.token);
    encryptToken(res.data.user.token);
    dispatch(loginAction({ ...res.data.user }));
    // navigate("/dashboard");
  };
  const token = cookieService.get("auth_token");
  console.log(token);

  const detoken = decryptToken(`${token}`);
  console.log(detoken);

  return (
    <div className="flex justify-between  max-[800px]:justify-center m-auto h-[100vh]">
      <div className="w-1/2 p-4 h-full bg-background max-[800px]:hidden animate-fade-down">
        <div className=" flex flex-col  justify-center px-8 py-10 ">
          <img src={loginImage} alt="Login" className="w-[450px]" />
          <h1 className="  my-2 text-text font-bold text-lg md:text-xl xl:text-3xl">
            Find your sweet home
          </h1>
          <p className="  text-gray-600 text-sm md:text-base xl:text-lg">
            Schedule visit in just a few clicks visits in just a few clicks
          </p>
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
              <Button block type="primary" htmlType="submit">
                Log in
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
