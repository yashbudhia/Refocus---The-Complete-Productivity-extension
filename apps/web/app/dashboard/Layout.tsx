import Sidebar from "@/components/dashboard/SidebarCode";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      {children}
    </div>
  );
};
export default Layout;
