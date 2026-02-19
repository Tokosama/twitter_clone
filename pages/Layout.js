import Trend from "@/components/Trend";
import Sidebar from "../components/Sidebar";
import BottomNavBar from "@/components/BottomBar";

export default function Layout({ children }) {
  return (
    <div className=" flex  min-h-screen max-w-7xl mx-auto">
      <BottomNavBar />
      <Sidebar />
      <div className=" pb-24 lg:pb-4   w-full  flex justify-around sm:border  border-twitterBorder">
        <div className="w-full">{children}</div>
      </div>{" "}
      <Trend />
    </div>
  );
}
