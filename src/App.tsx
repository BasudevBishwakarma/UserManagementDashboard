import { useState, useEffect } from "react";
import { Tabs } from "antd";
import { ColumnHeightOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "./routes";

const tabItems = [
  {
    key: "/",
    label: "User Dashboard",
    icon: <UserOutlined />,
  },
  {
    key: "/infinite-scroll",
    label: "Infinite Scroll",
    icon: <ColumnHeightOutlined />,
  },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Track active tab based on current URL path
  const [activeKey, setActiveKey] = useState(location.pathname);

  // Sync tab selection when route changes (back/forward)
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location.pathname]);

  const onTabChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-[20px]">
      <header className="bg-white pt-[10px] shadow">
        <Tabs
          activeKey={activeKey}
          onChange={onTabChange}
          size="large"
          items={tabItems.map(({ key, label, icon }) => ({
            key,
            label,
            icon,
          }))}
        />
      </header>
      <main className="p-6">
        <AppRoutes />
      </main>
    </div>
  );
}
