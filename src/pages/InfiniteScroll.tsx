import { useEffect, useState } from "react";
import UserCard from "./components/card/UserCard";
import axios from "axios";
import { Spin } from "antd";

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
    } catch (err) {
      console.error("Failed to fetch users:", err);
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

  return (
    <div className="p-5 flex flex-wrap gap-[24px]">
      {userData.map((items) => (
        <div key={items.id} className="w-[calc(50%-1.25rem)]">
          <UserCard data={items} />
        </div>
      ))}
      <div className="w-full flex justify-center">
        {loading && <Spin size="large" tip="Loading..." />}
      </div>
    </div>
  );
};

export default InfiniteScroll;
