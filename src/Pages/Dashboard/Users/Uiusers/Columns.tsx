import { Button, Image, Input, Space, Tag, type TableProps } from "antd";
import type { IAllUsers } from "./AllUsersTable";
import { Search } from "lucide-react";

export const columns: TableProps<IAllUsers>["columns"] = [
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
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.first_name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
