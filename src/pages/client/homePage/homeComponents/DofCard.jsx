import React from 'react';
import { Link } from 'react-router-dom';
import { dofProducts } from '../../../../lib/data/DataBase';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';




const DofCard = () => {

  const axiosPublic = useAxiosPublic();
  const { data: products, isLoading } = useQuery({
    queryKey: ['dofProducts'],
    queryFn: async () => {
      const res = await axiosPublic.get('/product');
      return res.data;
    }
  })

  console.log(products);

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-[#f59121] mb-6 uppercase text-center">Feature Products</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-8/12 mx-auto">
        {products?.map((item) => (
          <Link
            to={`/dof/${item?._id}`}
            key={item?._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center"
          >
            <img src={item?.image} alt={item?.name} className=" w-full object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold text-[#f59121]">{item?.name}</h3>
            <p className="text-gray-700">
              {item?.discountPrice}৳ <span className="line-through text-gray-400">{item?.price}৳</span>
            </p>
            <div className="text-white flex flex-col gap-3 my-3">
              <button className="bg-[#f59121] hover:bg-orange-600 py-2">ADD TO CART</button>
              <button className="bg-[#f59121] hover:bg-orange-600 py-2">BUY NOW</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DofCard;
