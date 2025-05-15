import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
import { useState } from "react";
import {
  useAddCountriesMutation,
  useDeleteCountriesMutation,
  useEditCountriesMutation,
  useGetAllCountriesQuery,
} from "../../../../app/features/address/countries/countriesApi";
import { cookieService } from "../../../../Cookies/CookiesServices";
import { showMessage } from "../../../../components/Message/Message";
import { Button, message, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
type DataSourceType = {
  id: number; // Explicitly define id as string or number
  name?: string;
};

const CountriesTable = () => {
  const token = cookieService.get("auth_token");
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [isEdit, setisEdit] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { data: countries, isLoading } = useGetAllCountriesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [addCountries] = useAddCountriesMutation();
  const [editCountries] = useEditCountriesMutation();
  const [deleteCountries] = useDeleteCountriesMutation();

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Country Name",
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
    // {
    //   title: "Status",
    //   key: "state",
    //   dataIndex: "state",
    //   valueType: "select",
    //   valueEnum: {
    //     all: { text: "All", status: "Default" },
    //     open: {
    //       text: "Unresolved",
    //       status: "Error",
    //     },
    //     closed: {
    //       text: "Resolved",
    //       status: "Success",
    //     },
    //   },
    // },

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
            deleteCountries({
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
        value={countries?.countries}
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
                ? await editCountries({
                    name: `${record.name}`,
                    id: record.id,
                    token: `${token}`,
                  })
                : await addCountries({
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
export default CountriesTable;
