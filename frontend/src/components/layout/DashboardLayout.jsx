import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">

        {/* Top header */}
        <Header />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 sm:p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
