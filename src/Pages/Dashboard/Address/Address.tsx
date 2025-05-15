import { Tabs, type TabsProps } from "antd";
import CountriesTable from "./Countries/CountriesPage";

import RegionsPage from "./Regions/RegionsPage";
import CitiesTable from "./Cities/CitiesPage";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Countries",
    children: <CountriesTable />,
  },
  {
    key: "2",
    label: "Cities",
    children: <CitiesTable />,
  },
  {
    key: "3",
    label: "Regions",
    children: <RegionsPage />,
  },
];

const Address = () => {
  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold">Address</h2>
        <p className="text-neutral-500">
          You can specify the countries, cities, and regions that you want to
          appear to users when adding properties or selling anything else.
        </p>
      </div>

      <div className="mt-4">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Address;
