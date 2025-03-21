import { useState, Suspense, lazy } from "react";
import { Loader } from "../Loader/Loader";
import { ChevronCompactLeft } from "../svg";
const EditorTools = lazy(() => import("../editor-css/EditorTools"))

const SideBarRigthtItems = () => {
  const [hiddenSecction, setHiddenSecction] = useState(true)

  const hdlToggle = () => {
    setHiddenSecction(!hiddenSecction)
  }

  return (
    <aside className={`fixed z-10 inset-[20px_10px_20px_auto] rounded-xl shadow-lg bg-gray-700 text-white builder__aside builder__aside--right flex justify-center items-center transition-all duration-300 ${hiddenSecction ? "translate-x-[330px]" : ""}`}>
      <div className="relative flex items-center">
        <button className="w-6 h-8 absolute rounded-tl-full rounded-bl-full bg-gray-700 right-[0.01px] flex justify-center items-center text-white transition-all duration-300" type="button" onClick={hdlToggle}> 
          <ChevronCompactLeft className={`transition-all duration-300 ${hiddenSecction ? "" : "rotate-180"}`} />
        </button>
      </div>
      <div className={`h-full w-80 overflow-y-auto overflow-x-hidden`} style={{ scrollbarWidth: "thin" }}>
        <Suspense fallback={<Loader />}>
          <EditorTools />
        </Suspense>
      </div>
    </aside>
  );
};

export default SideBarRigthtItems;
