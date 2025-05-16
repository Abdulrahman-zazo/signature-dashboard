import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
import { useState } from "react";
import { useGetAllCountriesQuery } from "../../../../app/features/address/countries/countriesApi";
import { cookieService } from "../../../../Cookies/CookiesServices";
import { showMessage } from "../../../../components/Message/Message";
import { Button, message, Popconfirm, Select } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  useAddCitiesMutation,
  useDeleteCitiesMutation,
  useEditCitiesMutation,
  useGetAllCitiesByCountryIdQuery,
} from "../../../../app/features/address/cities/citiesApi";
type DataSourceType = {
  id: number; // Explicitly define id as string or number
  name?: string;
};
export interface ICountries {
  name: string;
  id?: string | number;
}
const CitiesTable = () => {
  const token = cookieService.get("auth_token");
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [countryid, setcountryid] = useState("1");
  const [isEdit, setisEdit] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { data: countries } = useGetAllCountriesQuery({
    refetchOnMountOrArgChange: true,
  });
  const countryOptions = countries?.countries?.map(
    ({ id, name }: ICountries) => ({
      value: id,
      label: name,
    })
  );

  const { data: cities, isLoading } =
    useGetAllCitiesByCountryIdQuery(countryid);
  const [addCities] = useAddCitiesMutation();
  const [editCities] = useEditCitiesMutation();
  const [deleteCities] = useDeleteCitiesMutation();

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "City Name",
      dataIndex: "name",
      tooltip:
        "These are the countries that appear to users and merchants when adding something and selecting the address.",
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
      title: "Country",
      key: "countryid",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        all: { text: "All", status: "Default" },
        open: {
          text: "Unresolved",
          status: "Error",
        },
        closed: {
          text: "Resolved",
          status: "Success",
        },
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
          title="Delete the Country"
          description="Are you sure to delete this Country?"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() =>
            deleteCities({
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
                onChange={(value: string) => setcountryid(value)}
                options={countryOptions}
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
        value={cities?.cities}
        editable={{
          type: "single",
          editableKeys,
          onSave: async (rowKey, record) => {
            console.log("on-save:", rowKey, record);
            try {
              showMessage({
                messageApi,
                type: "loading",
                content: "جاري إضافة الدولة...",
                duration: 4,
              });

              const res = isEdit
                ? await editCities({
                    name: `${record.name}`,
                    id: record.id,
                    token: `${token}`,
                  })
                : await addCities({
                    name: `${record.name}`,
                    token: `${token}`,
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
export default CitiesTable;
