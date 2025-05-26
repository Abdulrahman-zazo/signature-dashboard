import { Button, Popover, Select } from "antd";
import { useGetAllordersQuery } from "../../../app/features/orders/ordersApi";
import SkeletonCustom from "../../../components/Skeleton";

import AdsCards from "./UiOrder/AdsCards";
import AdsTable from "./UiOrder/AdsTable";
import { setDisplayDataAsCard } from "../../../app/features/uiSlice/uiSlice";
import { useAppSelector } from "../../../app/store";
import { useDispatch } from "react-redux";
import { cookieService } from "../../../Cookies/CookiesServices";
import { useEffect, useState } from "react";
import { Filter, Grid2x2, List } from "lucide-react";
import type { Filters, OrderItem } from "../../../types";
import FilterBar from "../../../components/FilterBar";
const defaultFilters: Filters = {
  subCategory: "",
  priceRange: [0, 100000000],
  areaRange: [0, 1000],
  ownershipType: "",
  features: [],
  country: "",
  city: "",
  region: "",
};
const OrderPage = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<OrderItem[]>([]);
  const token = cookieService.get("auth_token");
  const { data, isLoading } = useGetAllordersQuery(`${token}`, {
    refetchOnMountOrArgChange: true,
  });

  const [publicationType, setPublicationType] = useState<
    "all" | "rent" | "sale"
  >("all");
  const [mainCategory, setMainCategory] = useState<string>("all");

  const { DisplayDataAsCard } = useAppSelector((state) => state.uiSlice);
  const Dispatsh = useDispatch();

  const applyFilters = () => {
    if (!data?.orders) return;

    const result = data.orders.filter((item: OrderItem) => {
      const ad = item.order;

      const matchesPub =
        publicationType === "all" || ad.publication_type === publicationType;

      const matchesMain =
        mainCategory === "all" || ad.main_category?.name === mainCategory;

      const matchesSubCategory =
        !filters.subCategory || ad.sub_category?.name === filters.subCategory;

      const matchesOwnership =
        !filters.ownershipType ||
        ad.ownership_type?.name === filters.ownershipType;

      const matchesPrice =
        ad.price >= filters.priceRange[0] && ad.price <= filters.priceRange[1];

      const matchesArea =
        ad.area >= filters.areaRange[0] && ad.area <= filters.areaRange[1];

      const matchesFeatures =
        filters.features.length === 0 ||
        filters.features.every((f) => ad.features?.some((af) => af.name === f));

      const matchesCountry =
        !filters.country || ad.address?.country?.name === filters.country;

      const matchesCity =
        !filters.city || ad.address?.city?.name === filters.city;

      const matchesRegion =
        !filters.region || ad.address?.region?.name === filters.region;

      return (
        matchesPub &&
        matchesMain &&
        matchesSubCategory &&
        matchesOwnership &&
        matchesPrice &&
        matchesArea &&
        matchesFeatures &&
        matchesCountry &&
        matchesCity &&
        matchesRegion
      );
    });

    setFilteredData(result);
  };

  useEffect(() => {
    if (data?.orders) applyFilters();
  }, [data, publicationType, mainCategory, filters]);

  return (
    <div>
      {/* top section */}
      <div>
        <h3 className="mb-3 text-xl font-semibold">All Orders</h3>
        <div className="flex items-center justify-between ">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Select
              value={publicationType}
              onChange={(v) => setPublicationType(v)}
              style={{ width: 140 }}
            >
              <Select.Option value="all">الكل</Select.Option>
              <Select.Option value="rent">للإيجار</Select.Option>
              <Select.Option value="sale">للبيع</Select.Option>
            </Select>

            <Select
              value={mainCategory}
              onChange={(v) => setMainCategory(v)}
              style={{ width: 140 }}
            >
              <Select.Option value="all">كل التصنيفات</Select.Option>
              <Select.Option value="أراضي">أراضي</Select.Option>
              <Select.Option value="سكني">سكني</Select.Option>
              <Select.Option value="تجاري">تجاري</Select.Option>
            </Select>

            <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
              🔍 فلترة متقدمة
            </Button>
          </div>

          <div>
            <Popover
              content={
                DisplayDataAsCard === "card" ? "Show as List" : "Show as grid"
              }
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
                {DisplayDataAsCard === "card" ? (
                  <List size={16} />
                ) : (
                  <Grid2x2 size={16} />
                )}
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

      <div className="m-4">
        <FilterBar
          visible={isDrawerOpen}
          filters={filters}
          onChange={setFilters}
          onApply={applyFilters}
          onClose={() => setIsDrawerOpen(false)}
          onReset={() => setFilters(defaultFilters)}
        />
      </div>
      <div className="">
        {isLoading && (
          <SkeletonCustom
            type={DisplayDataAsCard === "card" ? "list" : "card"}
          />
        )}
        {filteredData.length > 0 ? (
          DisplayDataAsCard === "card" ? (
            <AdsCards data={filteredData} />
          ) : (
            <AdsTable data={filteredData} />
          )
        ) : (
          <div className="py-10 text-center text-gray-400">
            لا توجد نتائج مطابقة
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderPage;
