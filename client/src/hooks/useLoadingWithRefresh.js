import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../feature/user/userSlice";
import { getUser } from "../http";

export const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    // immediatly invoked function
    (async () => {
      try {
        const { data } = await getUser();
        dispatch(setAuth(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
};
