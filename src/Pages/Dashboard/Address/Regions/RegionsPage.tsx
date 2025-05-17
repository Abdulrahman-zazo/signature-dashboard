import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
import { useState } from "react";
import { cookieService } from "../../../../Cookies/CookiesServices";
import { showMessage } from "../../../../components/Message/Message";
import { Button, message, Popconfirm, Select } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useGetAllCitiesQuery } from "../../../../app/features/address/cities/citiesApi";
import {
  useAddRegionsMutation,
  useDeleteRegionsMutation,
  useEditRegionsMutation,
  useGetAllRegionsByCityQuery,
} from "../../../../app/features/address/regions/regionsApi";
type DataSourceType = {
  id: number; // Explicitly define id as string or number
  name?: string;
};
export interface Icities {
  name: string;
  id?: string | number;
}
const RegionsPage = () => {
  const token = cookieService.get("auth_token");
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [Cityid, setCityid] = useState("1");
  const [isEdit, setisEdit] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { data: cities } = useGetAllCitiesQuery({
    refetchOnMountOrArgChange: true,
  });
  const citiesOptions = cities?.cities?.map(({ id, name }: Icities) => ({
    value: id,
    label: name,
  }));

  const { data: regions, isLoading } = useGetAllRegionsByCityQuery(Cityid);
  const [addRegions] = useAddRegionsMutation();
  const [editRegions] = useEditRegionsMutation();
  const [deleteRegions] = useDeleteRegionsMutation();

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Region Name",
      dataIndex: "name",
      tooltip:
        "These are the Reigon that appear to users and merchants when adding something and selecting the address.",
      fieldProps: (form, { rowKey }) => {
        if (form.getFieldValue([rowKey || "", "name"]) === "Not fun") {
          return {
            disabled: true,
          };
        }

        return {};
      },
    },

    {
      title: "Actions",
      valueType: "option",
      width: 300,
      render: (row, record, _, action) => [
        <Button
          key="editable"
          onClick={() => {
            setisEdit(!isEdit);
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </Button>,
        <Popconfirm
          title="Delete the city"
          description={`Are you sure to delete this ${record.name} city`}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() =>
            deleteRegions({
              name: `${record.name}`,
              id: record.id,
              token: `${token}`,
            })
          }
        >
          <Button danger>Delete</Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      {contextHolder}
      <EditableProTable<DataSourceType>
        headerTitle={
          <div className="grid grid-cols-2 gap-4 m-auto items-center w-full">
            <div>
              <p>select country to view city</p>
            </div>
            <div>
              <Select
                style={{ width: 120 }}
                onChange={(value: string) => setCityid(value)}
                options={citiesOptions}
              />
            </div>
          </div>
        }
        rowKey="id"
        recordCreatorProps={{
          position: "top",
          record: () => ({
            id: Number((Math.random() * 1000000).toFixed(0)),
            name: undefined, // or provide a default name if you want
          }),
        }}
        loading={isLoading}
        columns={columns}
        value={regions?.regions}
        editable={{
          type: "single",
          editableKeys,
          onSave: async (rowKey, record) => {
            console.log("on-save:", rowKey, record, Cityid);
            try {
              showMessage({
                messageApi,
                type: "loading",
                content: "جاري إضافة المنطقة...",
                duration: 4,
              });

              const res = isEdit
                ? await editRegions({
                    name: `${record.name}`,
                    id: record.id,
                    token: `${token}`,
                    city_id: Cityid,
                  })
                : await addRegions({
                    name: `${record.name}`,
                    token: `${token}`,
                    city_id: Cityid,
                  });

              if ("data" in res && res.data.status === true)
                showMessage({
                  messageApi,
                  type: "success",
                  content: "تمت الإضافة بنجاح!",
                });
            } catch (error) {
              console.log(error);
            }
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};
export default RegionsPage;
