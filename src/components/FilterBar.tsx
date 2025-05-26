import { Drawer, Select, Slider, Checkbox, Button } from "antd";
import type { Filters } from "../types";

const { Option } = Select;

interface Props {
  visible: boolean;
  filters: Filters;
  onChange: (updated: Filters) => void;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterBar: React.FC<Props> = ({
  visible,
  filters,
  onChange,
  onClose,
  onApply,
  onReset,
}) => {
  const update = (field: keyof Filters, value: any) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <Drawer
      title="فلترة متقدمة"
      placement="right"
      open={visible}
      onClose={onClose}
      width={360}
      footer={
        <div className="flex justify-between">
          <Button onClick={onReset}>إعادة تعيين</Button>
          <Button type="primary" onClick={onApply}>
            تطبيق
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Subcategory */}
        <div>
          <label>الفئة الفرعية:</label>
          <Select
            className="w-full"
            value={filters.subCategory}
            onChange={(v) => update("subCategory", v)}
          >
            <Option value="">الكل</Option>
            <Option value="تجارية">تجارية</Option>
            <Option value="سكنية">سكنية</Option>
            <Option value="زراعية">زراعية</Option>
            <Option value="صناعية">صناعية</Option>
          </Select>
        </div>

        {/* Ownership type */}
        <div>
          <label>نوع الملكية:</label>
          <Select
            className="w-full"
            value={filters.ownershipType}
            onChange={(v) => update("ownershipType", v)}
          >
            <Option value="">الكل</Option>
            <Option value="طابو أخضر">طابو أخضر</Option>
            <Option value="حكم محكمة">حكم محكمة</Option>
            <Option value="وكالة كاتب العدل">وكالة كاتب العدل</Option>
            <Option value="وصاية">وصاية</Option>
            <Option value="ورثة">ورثة</Option>
            <Option value="عقد بيع قطعي">عقد بيع قطعي</Option>
            <Option value="طابو اسهم">طابو اسهم</Option>
            <Option value="طابو زراعي">طابو زراعي</Option>
            <Option value="طابو إسكان">طابو إسكان</Option>
            <Option value="فروغ">فروغ</Option>
          </Select>
        </div>

        {/* Price + Area */}
        <div>
          <label>نطاق السعر:</label>
          <Slider
            range
            max={100000000}
            step={100000}
            value={filters.priceRange}
            onChange={(v) => update("priceRange", v as [number, number])}
          />
        </div>
        <div>
          <label>نطاق المساحة:</label>
          <Slider
            range
            max={1000}
            step={10}
            value={filters.areaRange}
            onChange={(v) => update("areaRange", v as [number, number])}
          />
        </div>

        {/* Features */}
        <div>
          <label>الميزات:</label>
          <Checkbox.Group
            options={["سور خارجي", "مسبح", "حديقة"]}
            value={filters.features}
            onChange={(checked) => update("features", checked as string[])}
          />
        </div>

        {/* Location */}
        <div>
          <label>الدولة:</label>
          <Select
            className="w-full"
            value={filters.country}
            onChange={(v) => update("country", v)}
          >
            <Option value="">الكل</Option>
            <Option value="مدغشقر">مدغشقر</Option>
            <Option value="الحمراء سوريا">الحمراء سوريا</Option>
          </Select>
        </div>
        <div>
          <label>المدينة:</label>
          <Select
            className="w-full"
            value={filters.city}
            onChange={(v) => update("city", v)}
          >
            <Option value="">الكل</Option>
            <Option value="جرش">جرش</Option>
            <Option value="الحصن2">الحصن2</Option>
          </Select>
        </div>
        <div>
          <label>المنطقة:</label>
          <Select
            className="w-full"
            value={filters.region}
            onChange={(v) => update("region", v)}
          >
            <Option value="">الكل</Option>
            <Option value="region30 جديدة">region30 جديدة</Option>
            <Option value="region63">region63</Option>
          </Select>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterBar;
