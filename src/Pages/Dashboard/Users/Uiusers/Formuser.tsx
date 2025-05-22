import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import { useAddUsersMutation } from "../../../../app/features/users/usersApi";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetAllRegionsQuery } from "../../../../app/features/address/regions/regionsApi";
import { Fragment } from "react/jsx-runtime";

export interface IFormUser {
  user_id: string;
  user_type: "merchant" | "user";
  first_name: string;
  last_name: string;
  email: string;
  region_id: string;
  phone_number: string;
  secondary_address: string;
  identification_papers?: File[];
}
export interface Iregions {
  name: string;
  id: string | number;
}
const Formuser = () => {
  // 1- Initial values for login form.
  const initialValues: IFormUser = {
    user_id: "",
    user_type: "user",
    first_name: "",
    last_name: "",
    email: "",
    region_id: "",
    phone_number: "",
    secondary_address: "",
  };

  const { data, isLoading } = useGetAllRegionsQuery({});
  console.log(data);
  //   const [addUsers, { isLoading }] = useAddUsersMutation();
  const onFinish = async (values: IFormUser) => {
    console.log(values);
    //     try {
    //       showMessage({
    //         messageApi,
    //         type: "loading",
    //         content: "جاري تسجيل الدخول...",
    //         duration: 4,
    //       });

    //       const result = await login(values);

    //       if ("data" in result && result.data.status === true) {
    //         showMessage({
    //           messageApi,
    //           type: "success",
    //           content: result.data?.msg,
    //         });

    //         // 2- Using result.data.user because data from useLoginMutation in initial undefined then its return error message.
    //         encryptToken(result.data.user.token);
    //         setTimeout(() => navigate("/dashboard"), 1000);
    //       } else {
    //         showMessage({
    //           messageApi,
    //           type: "error",
    //           content: result.data?.msg,
    //         });
    //       }
    //     } catch (err) {
    //       const error = err as { data?: { msg?: string } };
    //       showMessage({
    //         messageApi,
    //         type: "error",
    //         content: error.data?.msg || "حدث خطأ أثناء الاتصال بالخادم",
    //       });
    //     }
    //   };}
  };
  return (
    <>
      <Form
        size="middle"
        layout="vertical"
        name="add new user"
        className="w-full"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}
            >
              <Input placeholder="Enter your First Name ..  " type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input placeholder="Enter your Last Name ..  " type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Region"
              name="region_id"
              rules={[
                { required: true, message: "Please Select your Region!" },
              ]}
            >
              <Select
                placeholder="Select region"
                loading={!data} // إذا كانت البيانات تُجلب من API
              >
                {data?.regions?.length ? (
                  data?.regions.map(({ name, id }: Iregions) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option disabled value="">
                    No regions available
                  </Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Secondary Address"
              name="secondary_address"
              rules={[
                {
                  required: true,
                  message: "Please input your Secondary Address!",
                },
              ]}
            >
              <Input
                placeholder="Enter your Secondary Address ..  "
                type="text"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Please enter numbers only!",
                },
              ]}
            >
              <Input placeholder="Enter your Phone Number ..  " type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Col span={12}>
          <Form.Item
            label="User type"
            name="user_type"
            rules={[
              { required: true, message: "Please Select your User type" },
            ]}
          >
            <Select>
              <Select.Option value={"user"}>User</Select.Option>;
              <Select.Option value={"merchant"}>Merchant</Select.Option>;
            </Select>
          </Form.Item>
        </Col>

        <Form.Item>
          <Button block type="primary" htmlType="submit" disabled={isLoading}>
            {isLoading ? (
              <Spin size="default" indicator={<LoadingOutlined spin />} />
            ) : (
              "save"
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Formuser;
