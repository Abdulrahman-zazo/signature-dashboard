import {
  Avatar,
  Badge,
  Button,
  Card,
  Drawer,
  Form,
  Image,
  Input,
  Upload,
} from "antd";
import { useGetAllComplaintsQuery } from "../../../app/features/complaints/complaintsApi";
import SkeletonCustom from "../../../components/Skeleton";
import { cookieService } from "../../../Cookies/CookiesServices";
import { useState } from "react";
import { ImageUp } from "lucide-react";
import { useAddCitiesMutation } from "../../../app/features/address/cities/citiesApi";
interface IComplaints {
  title: string;
  text: string;
  id: string;
  medias?: string[];
  url?: string;
}
interface IFormComplaints {
  complaint_id: string;
  reply: string;
  complaint_image?: HTMLImageElement;
}

const ComplaintsPage = () => {
  const initialValues: IFormComplaints = {
    complaint_id: "",
    reply: "",
  };
  const token = cookieService.get("auth_token");
  const [ComplaintsToReplay, setComplaintsToReplay] = useState<IComplaints>();
  const [openDrawer, setopenDrawer] = useState<boolean>(false);
  const { data, isLoading } = useGetAllComplaintsQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  const handelOpenForm = ({ id, title, text }: IComplaints) => {
    setComplaintsToReplay({ id, title, text });
    setopenDrawer(!openDrawer);
  };
  const [addComplaints, { isLoading: isLoadingC }] = useAddCitiesMutation();
  const onFinish = async () => {
    // try {
    //   showMessage({
    //     messageApi,
    //     type: "loading",
    //     content: "جاري تسجيل الدخول...",
    //     duration: 4,
    //   });
    //   const result = await login(values);
    //   if ("data" in result && result.data.status === true) {
    //     showMessage({
    //       messageApi,
    //       type: "success",
    //       content: "تم التسجيل بنجاح!",
    //     });
    //     // ✅ استخدام result.data.user
    //     encryptToken(result.data.user.token);
    //     setTimeout(() => navigate("/dashboard"), 1000);
    //   } else {
    //     showMessage({
    //       messageApi,
    //       type: "error",
    //       content: result.data?.msg || "فشل في تسجيل الدخول",
    //     });
    //   }
    // } catch (err) {
    //   const error = err as { data?: { msg?: string } };
    //   showMessage({
    //     messageApi,
    //     type: "error",
    //     content: error.data?.msg || "حدث خطأ أثناء الاتصال بالخادم",
    //   });
    // }
  };
  console.log(ComplaintsToReplay);
  if (isLoading) {
    return <SkeletonCustom type="h-card" />;
  }
  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold m-2">Complaints</h2>
        <div className="flex items-center gap-4">
          <Button>ALL (10)</Button>
          <Badge count={4} showZero={false}>
            <Button>Unreplay </Button>
          </Badge>
        </div>
      </div>
      <div>
        <div className="mt-8 flex justify-between items-start gap-4 h-[100%]">
          <div className="animate-fade-left">
            {data?.complaints.map(
              ({ id, medias, text, title, url }: IComplaints) => (
                <div className="mb-4 ">
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
                        medias?.map((img) => (
                          <div>
                            <Avatar className="mx-2 w-[100px]">
                              <Image
                                src={img.url}
                                alt="image complaints"
                                className="w-1/2 h-1/2  object-cover"
                              />
                            </Avatar>
                          </div>
                        ))}

                      <p className="mx-4">{text}</p>
                    </div>
                  </Card>
                </div>
              )
            )}
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
            <h2 className="font-semibold border-b-2 border-neutral-100 pb-2">
              {ComplaintsToReplay?.title}
            </h2>
            <p className=" p-2">{ComplaintsToReplay?.text}</p>
          </div>
        )}
        <div className="sticky top-0 z-10  bg-neutral-50   bottom-0  p-4">
          <Form
            layout="vertical"
            className="w-[100%]"
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <Form.Item
              className="w-[100%]"
              name="reply"
              rules={[
                {
                  required: true,
                  message: "Please enter reply",
                },
              ]}
            >
              <Input.TextArea rows={3} placeholder="Please enter reply" />
            </Form.Item>
            <div className=" flex gap-4 justify-between w-full">
              <Form.Item
                className="w-[100%]"
                name="reply"
                rules={[
                  {
                    required: true,
                    message: "Please enter reply",
                  },
                ]}
              >
                <Upload className="p-2">
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
                Send
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default ComplaintsPage;
