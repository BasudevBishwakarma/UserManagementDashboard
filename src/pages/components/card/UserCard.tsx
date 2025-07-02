// components/UserCard.tsx
import React from "react";

type UserCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string; // image URL
};

type PropsType = {
  data: UserCardProps;
};

const UserCard: React.FC<PropsType> = ({ data }: PropsType) => {
  return (
    <div className="max-w-sm p-[20px] bg-white border-1 rounded-[8px] shadow-md text-center bg-[#A9A9A9]">
      <img
        src={data?.image}
        alt={`${data?.firstName} ${data?.lastName}`}
        className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{`${data?.firstName} ${data?.lastName}`}</h2>
      <p className="text-sm text-gray-600 mt-1">
        <strong>Email:</strong> {data?.email}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Gender:</strong> {data?.gender}
      </p>
      <p className="flex justify-end">No: {data?.id}</p>
    </div>
  );
};

export default UserCard;
