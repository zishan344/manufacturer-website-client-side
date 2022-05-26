import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;
    if (!email) {
      return;
    }
    fetch(`https://desolate-citadel-69075.herokuapp.com/user/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
          setToken(result.accessToken);
        }
      });
  }, [user]);
  return [token];
};

export default useToken;
