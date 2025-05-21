import { Breadcrumb, Button, Table } from "antd";

import { useGetAllUsersQuery } from "../../../../app/features/users/usersApi";
import { cookieService } from "../../../../Cookies/CookiesServices";
import SkeletonCustom from "../../../../components/Skeleton";
import { GrAdd } from "react-icons/gr";
import { LocationEdit } from "lucide-react";
import { columns } from "./Columns";

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
  const { data, isLoading, isError } = useGetAllUsersQuery(`${token}`, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <SkeletonCustom type="list" />;
  }
  return (
    <>
      <div className="flex justify-between items-center mx-2 mb-4 pb-4 border-b-[0.1px] border-neutral-200">
        <div>
          <h2 className="text-lg font-semibold text-text">Users</h2>
          <p className="text-sm text-neutral-500">
            Manage users in your team and their roles
          </p>
        </div>
        <Button type="primary" className="">
          Add New Users <GrAdd />
        </Button>
      </div>

      <Table<IAllUsers>
        rowKey={(record) => record.id}
        columns={columns}
        key="id"
        dataSource={data?.users}
        size="middle"
        expandable={{
          expandedRowRender: (record) => (
            <div className="my-4 ">
              <p className="flex items-center gap-2 my-2">
                <span className="mx-2 font-semibold">
                  <LocationEdit size={20} />
                </span>
                <Breadcrumb
                  className=""
                  items={[
                    { title: `${record.address.country.name}` },
                    { title: `${record.address.city.name}` },
                    { title: `${record.address.region.name}` },
                    { title: `${record.address.secondary_address}` },
                  ]}
                />
              </p>
            </div>
          ),
          rowExpandable: (record) => record.email !== "Not Expandable",
        }}
      />
    </>
  );
};

export default AllUsersTable;
