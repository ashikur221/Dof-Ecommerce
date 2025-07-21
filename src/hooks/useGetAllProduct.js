import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
 // Adjust the path if needed

const useGetAllProduct = () => {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/product');
      return res.data;
    }
  });
};

export default useGetAllProduct;
