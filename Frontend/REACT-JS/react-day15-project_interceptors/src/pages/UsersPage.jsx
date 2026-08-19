import React, { useEffect, useState } from "react";

import UserCard from "../components/UserCard";
import { axiosInstance } from "../config/AxiosInstance";

const UsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let getUsersData = async () => {
    try {
      let res = await axiosInstance.get("/users");
      console.log(res);
      setUsersData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Errors here", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  if (isLoading) return <h1 className="text-4xl">Loading...</h1>;
  return (
    <div className="grid grid-cols-4 gap-5">
      {usersData.map((val) => (
        <UserCard key={val.id} user={val} />
      ))}
    </div>
  );
};

export default UsersPage;
