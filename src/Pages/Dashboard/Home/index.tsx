import { Button, Popover, Select } from "antd";
import { Filter, Grid2X2, List } from "lucide-react";
import { useState } from "react";

import { cookieService } from "../../../Cookies/CookiesServices";
import { useGetAllAdsQuery } from "../../../app/features/Ads/adsApi";
import SkeletonCustom from "../../../components/Skeleton";
import { useAppSelector } from "../../../app/store";
import { useDispatch } from "react-redux";
import { setDisplayDataAsCard } from "../../../app/features/uiSlice/uiSlice";
import AdsCards from "./UiHome/AdsCards";
import AdsTable from "./UiHome/AdsTable";
import { useGetAllComplaintsQuery } from "../../../app/features/complaints/complaintsApi";

const HomePage = () => {
  const [FilterAs, seTFelterAs] = useState("all");

  const { DisplayDataAsCard } = useAppSelector((state) => state.uiSlice);
  const Dispatsh = useDispatch();
  const token = cookieService.get("auth_token");

  const { data, isLoading, error } = useGetAllAdsQuery(`${token}`);

  console.log(data, isLoading, error);
  useGetAllComplaintsQuery(`${token}`, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div>
      {/* top section */}
      <div>
        <h3 className="mb-3 text-xl font-semibold">All Real state</h3>
        <div className="flex items-center justify-between ">
          <div className="flex gap-4 max-[800px]:hidden ">
            <Button
              onClick={() => seTFelterAs("all")}
              className="px-4"
              type={FilterAs === "all" ? "primary" : "default"}
            >
              All
            </Button>
            <Button
              onClick={() => seTFelterAs("rent")}
              className="px-8"
              type={FilterAs === "rent" ? "primary" : "default"}
            >
              For Rent
            </Button>
            <Button
              onClick={() => seTFelterAs("sale")}
              className="px-8"
              type={FilterAs === "sale" ? "primary" : "default"}
            >
              For Sale
            </Button>
          </div>
          <div className="flex gap-4 min-[800px]:hidden ">
            <Select
              defaultValue={FilterAs}
              style={{ width: 120 }}
              onChange={(value: string) => seTFelterAs(value)}
              options={[
                { value: "all", label: "All" },
                { value: "rent", label: "For Rent" },
                { value: "sale", label: "For Sale" },
              ]}
            />
          </div>
          <div>
            <Popover
              content={DisplayDataAsCard ? "Show as List" : "Show as grid"}
            >
              <Button
                className="mx-1"
                onClick={() =>
                  Dispatsh(
                    setDisplayDataAsCard(
                      DisplayDataAsCard === "card" ? "list" : "card"
                    )
                  )
                }
              >
                {DisplayDataAsCard ? <List size={16} /> : <Grid2X2 size={16} />}
              </Button>
            </Popover>
            <Popover content="Filter">
              <Button className="mx-1">
                <Filter size={16} />
              </Button>
            </Popover>
          </div>
        </div>
      </div>

      <div className="">
        {isLoading && (
          <SkeletonCustom
            type={DisplayDataAsCard === "card" ? "list" : "card"}
          />
        )}
        {data && DisplayDataAsCard === "card" ? (
          <div className="grid grid-cols-1 gap-8 mt-6 md:grid-cols-3 lg:grid-col-4">
            <AdsCards />
          </div>
        ) : (
          <div className="mt-6">
            <AdsTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
