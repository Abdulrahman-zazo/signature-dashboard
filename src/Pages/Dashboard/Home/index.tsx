import { Button } from "antd";
import { Filter } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [FilterAs, seTFelterAs] = useState("all");

  console.log(FilterAs);

  return (
    <div>
      <div>
        <h3 className="font-semibold text-xl m-2">All Real state</h3>
        <div className="flex mx-2 justify-between items-center ">
          <div className="flex gap-4  ">
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
          <Button>
            <Filter size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
