import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
import { useState } from "react";
import {
  useAddCountriesMutation,
  useEditCountriesMutation,
  useGetAllCountriesQuery,
} from "../../../../app/features/address/countries/countriesApi";
import { cookieService } from "../../../../Cookies/CookiesServices";
import { showMessage } from "../../../../components/Message/Message";
import { message } from "antd";

type DataSourceType = {
  id?: string | number; // Explicitly define id as string or number
  name: string;
};

const CountriesTable = () => {
  const token = cookieService.get("auth_token");
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [isEdit, setisEdit] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useGetAllCountriesQuery({});
  const [addCountries] = useAddCountriesMutation();
  const [editCountries] = useEditCountriesMutation();

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Country Name",
      dataIndex: "name",
      tooltip:
        "These are the countries that appear to users and merchants when adding something and selecting the address.",
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || "", "country_name"]) === "Not fun") {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
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
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setisEdit(!isEdit);
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            console.log(record.id);
          }}
        >
          Delete
        </a>,
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
            id: (Math.random() * 1000000).toFixed(0),
          }),
        }}
        loading={isLoading}
        columns={columns}
        value={data?.countries}
        editable={{
          type: "single",
          editableKeys,
          onSave: async (rowKey, data) => {
            try {
              showMessage({
                messageApi,
                type: "loading",
                content: "جاري إضافة الدولة...",
                duration: 4,
              });

              const res = isEdit
                ? await editCountries({
                    name: data.name,
                    id: data.id,
                    token: `${token}`,
                  })
                : await addCountries({
                    name: data.name,
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
        }}
      />
    </>
  );
};
export default CountriesTable;
