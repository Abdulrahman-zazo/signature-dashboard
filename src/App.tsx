import "./App.css";
import { ChakraProvider, ProgressCircle } from "@chakra-ui/react";
import { system } from "./Chakraui/Config";
import { useAppDispatch, useAppSelector } from "./app/store";
import { changeLangAction } from "./app/features/LanguageSlice";
import Dashboard from "./Pages/Dashboard";

function App() {
  console.log(useAppSelector((state) => state.user.username));
  const dispatch = useAppDispatch();

  return (
    <>
      <ChakraProvider value={system}>
        <div className="m-4   bg-text">
          <button
            className="m-2"
            onClick={() => dispatch(changeLangAction("en"))}
          >
            English
          </button>
          <button
            className="m-2"
            onClick={() => dispatch(changeLangAction("ar"))}
          >
            العربية
          </button>
        </div>
        <Dashboard />
      </ChakraProvider>
    </>
  );
}

export default App;
