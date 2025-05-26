import { Breadcrumb } from "antd";
import { LocationEdit } from "lucide-react";
import type { IAllUsers } from "../../../../../types";

export const ExpandedRow = (record: IAllUsers) => (
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
);
