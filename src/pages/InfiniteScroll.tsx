import { useEffect, useMemo, useState } from "react";
import UserCard from "./components/card/UserCard";
import axios from "axios";
import { message, Select, Spin } from "antd";
import Search from "../components/table/FilterSearch";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
}

const InfiniteScroll = () => {
  const [userData, setUserData] = useState<UserType[]>([]);
  const [totalElement, setTotalElement] = useState<number | null>(null);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<string | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const { Option } = Select;

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/users?limit=10&skip=${
          limit === 10 ? 0 : limit - 10
        }`
      );
      const data = res?.data?.users;
      setUserData((prev) => [...prev, ...data]);
      const total = res?.data?.total;
      setTotalElement(total);
      setLoading(false);
    } catch (error) {
      console.error("ERROR: ", error);
      messageApi.error("Failed to fetch users:");
    }
  };

  useEffect(() => {
    if (totalElement && userData?.length >= totalElement) return;
    getUserData();
  }, [limit]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setLimit((prev) => prev + 10);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const filteredData = useMemo(() => {
    return userData?.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesName = fullName.includes(search.toLowerCase());
      const matchesGender = genderFilter ? user.gender === genderFilter : true;
      return matchesName && matchesGender;
    });
  }, [search, userData, genderFilter]);

  return (
    <div className="space-y-[10px]">
      {contextHolder}
      <div className="flex items-center gap-[10px] mb-2">
        <Search onSearch={setSearch} placeholder="Search..." />
        <Select
          allowClear
          placeholder="Gender"
          onChange={(value) => setGenderFilter(value || null)}
          className="w-[100px]"
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </div>
      <div className="flex flex-wrap gap-[24px]">
        {filteredData.map((items) => (
          <div key={items.id} className="w-[calc(50%-1.25rem)]">
            <UserCard data={items} />
          </div>
        ))}
        <div className="w-full flex justify-center">
          {loading && <Spin size="large" tip="Loading..." />}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
