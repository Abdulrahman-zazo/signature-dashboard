import { Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { OrderWrapper } from "../../../../types";

const { Meta } = Card;

const AdsCards = (data: OrderWrapper) => {
  console.log(data);
  return (
    <div className="grid grid-cols-1 gap-8 mt-6 md:grid-cols-3 lg:grid-col-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      ))}
    </div>
  );
};

export default AdsCards;
