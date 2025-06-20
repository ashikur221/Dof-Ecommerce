// hooks/useAuthUser.js
import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAuthUser = () => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosSecure.get('/me');
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [axiosSecure]);

  return { user, loading };
};

export default useAuthUser;
