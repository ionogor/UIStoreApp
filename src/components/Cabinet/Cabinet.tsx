import axios from "axios";
import { userInfo } from "os";
import React, { useEffect, useState } from "react";

type User = {
  login: string;
  phoneNumber: string;
};

type Total = {
  user: User;
};

const Cabinet = () => {
  const [data, setData] = useState<User | null>();
  const url = "http://localhost:7080/login/user";

  useEffect(() => {
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  console.log(data);
  console.log(data?.login);

  return <>{}</>;
};

export default Cabinet;
