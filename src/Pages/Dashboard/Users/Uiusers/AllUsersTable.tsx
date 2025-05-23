import {
  useDeleteUsersMutation,
  useGetAllUsersQuery,
} from "../../../../app/features/users/usersApi";
import { cookieService } from "../../../../Cookies/CookiesServices";
import SkeletonCustom from "../../../../components/Skeleton";
import { Button, message, Modal, Popconfirm, Table } from "antd";
import { GrAdd } from "react-icons/gr";
import { columns } from "./Columns";
import { useState } from "react";
import Formuser from "./Formuser";
import { ExpandedRow } from "./extraUi/expandedRowRender";
export interface IAllUsers {
  key: React.Key;
  id: string;
  address: {
    country: {
      name: string;
    };

    city: {
      name: string;
    };
    region: {
      id: string;
      name: string;
    };
    secondary_address: string;
  };
  user_type: "merchant" | "user";
  first_name: string;
  last_name: string;
  email: string;
  image_url: string;
  phone_number: string;
  status: number;
  personal_identification_papers: File[];
  roles: string[];
}

const AllUsersTable = () => {
  const token = cookieService.get("auth_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [IsModelOpen, setIsModelOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllUsersQuery(`${token}`, {
    refetchOnMountOrArgChange: true,
  });
  const [selectedUser, setSelectedUser] = useState<IAllUsers>();
  const handleEdit = (record: IAllUsers) => {
    setSelectedUser(record);
    setIsModelOpen(true);
  };
  const [deleteUsers] = useDeleteUsersMutation();

  if (isLoading) {
    return <SkeletonCustom type="list" />;
  }
  return (
    <>
      {contextHolder}
      <div className="flex justify-between items-center mx-2 mb-4 pb-4 border-b-[0.1px] border-neutral-200">
        <div>
          <h2 className="text-lg font-semibold text-text">Users</h2>
          <p className="text-sm text-neutral-500">
            Manage users in your team and their roles
          </p>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setSelectedUser(undefined); // ← أضف هذا السطر
            setIsModelOpen(true);
          }}
        >
          Add New Users <GrAdd />
        </Button>
      </div>

      <Table<IAllUsers>
        rowKey={(record) => record.id}
        columns={columns({
          onEdit: (record) => {
            handleEdit(record);
          },
          onDelete: (record) => {
            deleteUsers({
              user_id: `${record.id}`,
              token: `${token}`,
            });
            // <>
            //   <Popconfirm
            //     title="Delete the city"
            //     description={`Are you sure to delete this ${record.first_name} city`}
            //     onConfirm={() =>
            //       deleteUsers({
            //         user_id: record.id,
            //         token: `${token}`,
            //       })
            //     }
            //   >
            //     <Button danger>Delete</Button>
            //   </Popconfirm>
            // </>;
          },
          // 1- If need add more actions uncomment this and in column commponents
          // additionalActions: [
          //   {
          //     label: "Edit",
          //     action: (record) => console.log("Edit", record),
          //     icon: <EditIcon />,
          //   },
          // ],
          dropdownProps: {
            style: { minWidth: "150px" },
          },
        })}
        key="id"
        dataSource={data?.users}
        size="middle"
        expandable={{
          expandedRowRender: (record) => ExpandedRow(record),
          rowExpandable: (record) => record.email !== "Not Expandable",
        }}
      />
      <Modal
        style={{ top: 30 }}
        destroyOnClose={true}
        title={
          <div className="my-4">
            <h3 className="text-lg font-semibold text-text">Add New User</h3>
            <p className="text-sm font-normal text-neutral-500">
              if user type merchant you should upload identification papers.
            </p>
          </div>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={IsModelOpen}
        onCancel={() => {
          setIsModelOpen(false);
          setSelectedUser(undefined);
        }}
        footer={<></>}
      >
        <Formuser
          messageApi={messageApi}
          token={`${token}`}
          initialValues={selectedUser}
          onSuccess={() => setIsModelOpen(false)}
        />
      </Modal>
    </>
  );
};

export default AllUsersTable;
