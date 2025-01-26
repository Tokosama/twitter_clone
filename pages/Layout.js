import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className=" flex  min-h-screen max-w-7xl mx-auto   border-l border-r border-twitterBorder ">
      <Sidebar />
      <div className=" pb-24 lg:pb-4 pt-4  px-4 lg:px-8 w-full  flex justify-around ">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
