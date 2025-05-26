import { Button, Col, Form, Input, Row, Select, Spin, Upload } from "antd";
import {
  useAddUsersMutation,
  useEditUsersMutation,
  type Iusers,
} from "../../../../app/features/users/usersApi";

import { useGetAllRegionsQuery } from "../../../../app/features/address/regions/regionsApi";

import { showMessage } from "../../../../components/Message/Message";
import type { MessageInstance } from "antd/es/message/interface";
import { useEffect } from "react";
import type { IAllUsers } from "../../../../types";

export interface IFormUser {
  user_id?: string;
  user_type: "merchant" | "user";
  first_name: string;
  last_name: string;
  email: string;
  region_id: string;
  phone_number: string;
  secondary_address: string;
  identification_papers: File[];
}
interface FormUserProps {
  messageApi: MessageInstance;
  token: string;
  initialValues?: IAllUsers;
  onSuccess?: () => void;
}
export interface Iregions {
  name: string;
  id: string | number;
}
const Formuser = ({
  messageApi,
  token,
  initialValues,
  onSuccess,
}: FormUserProps) => {
  const isEditMode = !!initialValues?.id; // ← تحقق من وجود ID
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue({
        first_name: initialValues.first_name,
        last_name: initialValues.last_name,
        email: initialValues.email,
        phone_number: initialValues.phone_number,
        user_type: initialValues.roles[0],
        region_id: initialValues.address.region.id,
        secondary_address: initialValues.address.secondary_address,
      });
    } else {
      form.setFieldsValue({
        user_type: "user", // ← تعيين قيمة افتراضية
      });
    }
  }, [initialValues, form]);

  const { data: regionsData, isLoading: isLoadingRegions } =
    useGetAllRegionsQuery({});
  const [addUsers, { isLoading: isLoadingAdd }] = useAddUsersMutation();
  const [editUsers, { isLoading: isLoadingEdit }] = useEditUsersMutation();
  const onFinish = async (values: Iusers) => {
    try {
      showMessage({
        messageApi,
        type: "loading",
        content: isEditMode
          ? "جاري تحديث البيانات..."
          : "جاري إضافة مستخدم جديد...",
      });

      const body = {
        ...values,
        token: `${token}`,
        ...(isEditMode && { user_id: initialValues?.id }),
      };
      const result = isEditMode ? await editUsers(body) : await addUsers(body);

      if ("data" in result && result.data.status === true) {
        showMessage({
          messageApi,
          type: "success",
          content: result.data?.msg,
        });
        form.resetFields();
      } else {
        showMessage({
          messageApi,
          type: "error",
          content: result.data?.msg || "حدث خطأ غير متوقع",
        });
      }
    } catch (err) {
      console.log(err);
      showMessage({
        messageApi,
        type: "error",
        content: "حدث خطأ أثناء الاتصال بالخادم",
      });
    }
  };

  return (
    <>
      <Form
        form={form}
        size="middle"
        layout="vertical"
        name="add new user"
        className="w-full"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Row className="flex justify-around gap-2">
          <Col span={11} className="w-full">
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
          <Col span={11} className="w-full">
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
        <Row className="flex justify-around gap-2">
          <Col span={11}>
            <Form.Item
              label="Region"
              name="region_id"
              rules={[
                { required: true, message: "Please Select your Region!" },
              ]}
            >
              <Select
                placeholder="Select region"
                loading={isLoadingRegions} // إذا كانت البيانات تُجلب من API
              >
                {regionsData?.regions?.length ? (
                  regionsData?.regions.map(({ name, id }: Iregions) => (
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
          <Col span={11}>
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
        <Row className="flex justify-around gap-2">
          <Col span={11}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                disabled={isEditMode}
              />
            </Form.Item>
          </Col>

          <Col span={11}>
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
        <Row className="flex justify-around gap-2">
          <Col span={11}>
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

          <Col span={11}>
            <Form.Item
              label="وثائق الهوية"
              name="identification_papers"
              rules={[
                {
                  required:
                    form.getFieldValue("user_type") === "merchant" &&
                    !isEditMode,
                  message: "مطلوب للمتاجر الجديدة",
                },
              ]}
            >
              <Upload
                beforeUpload={(file) => {
                  // إضافة الملفات إلى state
                  return false;
                }}
              >
                <Button>تحميل الملفات</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex justify-around gap-2">
          <Col span={24}>
            <Form.Item>
              <Button
                className="w-full mt-4"
                type="primary"
                htmlType="submit"
                loading={isLoadingAdd || isLoadingEdit}
              >
                {isEditMode ? "تحديث" : "إضافة"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default Formuser;
