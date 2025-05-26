import {
  Button,
  Dropdown,
  Image,
  Input,
  Popconfirm,
  Space,
  Tag,
  type TableProps,
} from "antd";
import { Edit, MoreHorizontal, Search, TrashIcon } from "lucide-react";
import type { MenuProps } from "antd/lib";
import type { IAllUsers } from "../../../../types";

interface ActionColumnProps {
  onEdit?: (record: IAllUsers) => void;
  onDelete?: (record: IAllUsers) => void;
  additionalActions?: Array<{
    label: string;
    action: (record: IAllUsers) => void;
    icon?: React.ReactNode;
  }>;
  dropdownProps?: MenuProps;
}

export const columns = ({
  onEdit,
  onDelete,
  // additionalActions,
  dropdownProps,
}: ActionColumnProps): TableProps<IAllUsers>["columns"] => [
  {
    title: "",
    dataIndex: "image_url",
    key: "image_url",
    width: "5%",
    render: (image_url) => (
      <div className="w-[30px] h-[30px] overflow-hidden rounded-full">
        <Image src={image_url} className="object-cover w-full h-full" />
      </div>
    ),
  },
  {
    width: "20%",
    title: "Name",
    dataIndex: "first_name",
    key: "first_name",
    render: (_, record) => (
      <p>
        {record.first_name} {record.last_name}
      </p>
    ),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search name"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            size="small"
            style={{ width: 90 }}
            onClick={() => (clearFilters as () => void)?.()}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) => {
      const searchValue = value as string;
      return (
        record.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        record.last_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
    filterIcon: (filtered) => (
      <Search size={16} style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  },
  {
    width: "15%",
    title: "User Type",
    key: "roles",
    dataIndex: "roles",
    filters: [
      { text: "User", value: "user" },
      { text: "Merchant", value: "merchant" },
    ],
    onFilter: (value, record) => record.roles.includes(value as string),
    ellipsis: true,
    render: (_, { roles }) => (
      <>
        {roles.map((role, index) => {
          let color = roles.length > 5 ? "geekblue" : "green";
          if (role === "user") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={index}>
              {role.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    width: "20%",
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    width: "20%",
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
    render: (_, record) => (
      <a href={`tel:${record?.phone_number}`}>{record.phone_number}</a>
    ),
  },
  {
    title: "",
    key: "action",
    render: (_, record) => {
      const menuItems: MenuProps["items"] = [
        {
          key: "edit",
          label: "Edit",
          onClick: () => onEdit?.(record),
          icon: <Edit size={16} />,
        },

        {
          key: "delete",
          label: (
            <Popconfirm
              title="Delete the city"
              description={`Are you sure to delete this ${record.first_name} city?`}
              onConfirm={(record) => onDelete?.(record)}
            >
              <Button danger type="text">
                Delete
              </Button>
            </Popconfirm>
          ),
          danger: true,
          icon: <TrashIcon size={16} />,
        },
        // ...(additionalActions?.map((action, index) => ({
        //   key: `additional-${index}`,
        //   label: action.label,
        //   onClick: () => action.action(record),
        //   icon: action.icon,
        // })) || []),
      ];

      return (
        <Dropdown
          menu={{ items: menuItems, ...dropdownProps }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            size="small"
            type="text"
            icon={<MoreHorizontal size={16} />}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      );
    },
  },
];
