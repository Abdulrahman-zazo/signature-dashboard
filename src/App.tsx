import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { configDesign } from "./Antd/Config";
import { ConfigProvider } from "antd";
import ar_EG from "antd/locale/ar_EG";
import en_US from "antd/locale/en_US";
import { useAppSelector } from "./app/store";

function App() {
  // const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language);

  return (
    <>
      <ConfigProvider
        theme={configDesign}
        locale={language === "ar" ? ar_EG : en_US}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
