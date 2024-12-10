import Home from "@/pages/Home";
import SideNav from "./ui/nav&header/SideNav";

const MainPages = () => {
  return (
    <div className="flex flex-col relative">
      <div className="">
        <SideNav />
      </div>
      <Home />
    </div>
  );
};

export default MainPages;
