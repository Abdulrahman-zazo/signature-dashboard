import { Skeleton } from "antd";

interface IProps {
  type: "card" | "list" | "h-card";
  row?: number;
  Haveavatar?: boolean;
}
const { Image } = Skeleton;

const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="w-full overflow-x-auto mt-6">
      <table className="min-w-full border border-neutral-200 rounded-md">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="p-4 border-b border-neutral-200 text-left">
                <Skeleton.Input
                  style={{ width: 100, height: 20 }}
                  active
                  size="small"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <td key={colIndex} className="p-4 border-b border-neutral-100">
                  <Skeleton.Input
                    style={{ width: "80%", height: 16 }}
                    active
                    size="small"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SkeletonCustom = ({ type, row = 2, Haveavatar = true }: IProps) => {
  return (
    <>
      {type === "card" && (
        <div className="grid grid-cols-1   md:grid-cols-3 lg:grid-col-4 gap-8 mt-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="border-2 rounded-md border-neutral-100 p-4"
              key={index}
            >
              <Image
                style={{ width: "100%", height: "150px", marginBottom: "8px" }}
              />
              <Skeleton active paragraph={{ rows: row }} avatar={Haveavatar} />
            </div>
          ))}
        </div>
      )}
      {type === "list" && (
        <div className="w-full">
          <TableSkeleton cols={4} rows={8} />
        </div>
      )}
      {type === "h-card" && (
        <div className="w-full">
          <div className="mb-4">
            <Skeleton.Input active size="small" className="mb-2" />
            <div className="flex items-center gap-4 w-[20%] ">
              <Skeleton.Button
                active
                size={"small"}
                shape={"default"}
                style={{ width: "90%" }}
              />
              <Skeleton.Button
                active
                size={"small"}
                shape={"default"}
                style={{ width: "90%" }}
              />
            </div>
          </div>
          <div className="mt-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="border-2 rounded-md border-neutral-100 p-4 mt-2"
                key={index}
              >
                <Skeleton
                  active
                  paragraph={{ rows: row }}
                  avatar={Haveavatar}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SkeletonCustom;
