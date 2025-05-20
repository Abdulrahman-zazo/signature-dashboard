import {
  Avatar,
  Badge,
  Button,
  Card,
  Drawer,
  Form,
  Image,
  Input,
  message,
  Spin,
  Upload,
} from "antd";
import {
  useAddComplaintsMutation,
  useGetAllComplaintsQuery,
} from "../../../app/features/complaints/complaintsApi";
import SkeletonCustom from "../../../components/Skeleton";
import { cookieService } from "../../../Cookies/CookiesServices";
import { useState } from "react";
import { ImageUp } from "lucide-react";
import { showMessage } from "../../../components/Message/Message";
import { LoadingOutlined } from "@ant-design/icons";

interface IComplaints {
  title: string;
  text: string;
  id: string;
  medias?: [{ url?: string }];
  reply?: string;
}

interface IFormComplaints {
  complaint_id: string;
  reply: string;
  complaint_image?: Array<{ originFileObj: File }>;
}

const ComplaintsPage = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const initialValues: IFormComplaints = {
    complaint_id: "",
    reply: "",
  };
  const token = cookieService.get("auth_token");

  // 1- state Coplainats using in replay drawer.
  const [ComplaintsToReplay, setComplaintsToReplay] = useState<IComplaints>({
    id: "",
    title: "",
    text: "",
  });
  const [openDrawer, setopenDrawer] = useState<boolean>(false);
  const [is_UnreplayData, setIs_UnreplayData] = useState<boolean>(false);

  const { data, isLoading } = useGetAllComplaintsQuery(`${token}`, {
    refetchOnMountOrArgChange: true,
  });

  const handelOpenForm = ({ id, title, text }: IComplaints) => {
    setComplaintsToReplay({ id, title, text });
    setopenDrawer(!openDrawer);
  };
  const [addComplaints, { isLoading: isLoadingAdd }] =
    useAddComplaintsMutation();
  const onFinish = async ({ reply, complaint_image }: IFormComplaints) => {
    try {
      // عرض رسالة التحميل
      showMessage({
        messageApi,
        type: "loading",
        content: "جاري إرسال الرد على الشكوى",
        duration: 4,
      });

      const formData = new FormData();

      // إضافة الصور (إذا وجدت)
      complaint_image?.forEach((fileObj) => {
        if (fileObj.originFileObj) {
          formData.append("complaint_image", fileObj.originFileObj);
        }
      });

      // إضافة البيانات الأخرى
      formData.append("complaint_id", ComplaintsToReplay.id);
      formData.append("reply", reply);

      // إرسال الطلب
      const result = await addComplaints({
        complaint_image: formData?.complaint_image,
        complaint_id: ComplaintsToReplay.id,
        reply: reply,
        token: `${token}`,
      });

      // معالجة النتيجة
      if ("data" in result && result.data.status === true) {
        showMessage({
          messageApi,
          type: "success",
          content: result.data.msg,
        });
        form.resetFields();
      } else {
        showMessage({
          messageApi,
          type: "error",
          content: result.data?.msg || "فشل في الإرسال",
        });
      }
    } catch (err) {
      // معالجة الأخطاء
      const error = err as { data?: { msg?: string } };
      showMessage({
        messageApi,
        type: "error",
        content: error.data?.msg || "خطأ في الاتصال بالخادم",
      });
    }
  };

  if (isLoading) {
    return <SkeletonCustom type="h-card" />;
  }

  const FilterUnReplay = data?.complaints.filter(
    (el: IComplaints) => el.reply === "No reply"
  );
  const AllData = is_UnreplayData ? FilterUnReplay : data?.complaints;

  return (
    <div>
      {contextHolder}
      <div>
        <h2 className="m-2 text-lg font-semibold">Complaints</h2>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIs_UnreplayData(false)}>
            All ({data?.complaints.length})
          </Button>
          <Badge dot={FilterUnReplay?.length > 0 ? true : false}>
            <Button onClick={() => setIs_UnreplayData(true)}>Unreplay </Button>
          </Badge>
        </div>
      </div>
      <div>
        <div className="mt-8 flex justify-between items-start gap-4 h-[100%]">
          <div className="animate-fade-left">
            {AllData?.map(({ id, medias, text, title }: IComplaints) => (
              <div className="mb-4 " key={id}>
                <Card
                  title={title}
                  key={id}
                  extra={
                    <Button
                      type="primary"
                      title="Add Replay"
                      onClick={() => handelOpenForm({ id, title, text })}
                    >
                      Add Replay
                    </Button>
                  }
                  className=""
                >
                  <div className="flex items-center">
                    {medias?.length &&
                      medias?.map((img, indx) => (
                        <div key={indx}>
                          <Avatar className="mx-2 w-[100px]">
                            <Image
                              src={img.url}
                              alt="image complaints"
                              className="object-cover w-1/2 h-1/2"
                            />
                          </Avatar>
                        </div>
                      ))}

                    <p className="mx-4">{text}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Drawer
        width={500}
        title="Add Replay"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setopenDrawer(!openDrawer)}
        open={openDrawer}
      >
        {ComplaintsToReplay && (
          <div className="border border-neutral-200 rounded-md p-4 mb-4 animate-fade-left w-[100%]  ">
            <h2 className="pb-2 font-semibold border-b-2 border-neutral-100">
              {ComplaintsToReplay?.title}
            </h2>
            <p className="p-2 ">{ComplaintsToReplay?.text}</p>
          </div>
        )}
        <div className="sticky top-0 bottom-0 z-10 p-4 bg-neutral-50">
          <Form
            form={form}
            layout="vertical"
            name="Add Replay Form"
            className="w-[100%]"
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <Form.Item className="w-[100%]" name="complaint_id">
              <Input hidden value={ComplaintsToReplay?.id} />
            </Form.Item>
            <Form.Item
              className="w-[100%]"
              name="reply"
              label="Replay"
              rules={[
                {
                  required: true,
                  message: "Please enter reply",
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="Please enter reply" />
            </Form.Item>
            <div className="flex justify-between w-full gap-4 ">
              <Form.Item
                className="w-[100%]"
                name="complaint_image"
                valuePropName="fileList" // مطلوب لـ Upload
                getValueFromEvent={(e) => e.fileList} // تحويل الحدث إلى قيمة
              >
                <Upload
                  className="p-2"
                  multiple // السماح باختيار عدة ملفات
                  beforeUpload={() => false}
                  listType="text"
                >
                  <Button
                    icon={<ImageUp size={16} />}
                    className="w-full "
                    type="default"
                  >
                    Upload image (optionaly)
                  </Button>
                </Upload>
              </Form.Item>
              <Button type="primary" className="w-full" htmlType="submit">
                {isLoadingAdd ? (
                  <Spin size="default" indicator={<LoadingOutlined spin />} />
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default ComplaintsPage;
