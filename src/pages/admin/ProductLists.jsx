import React from 'react';
import useGetAllProduct from '../../hooks/useGetAllProduct';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductLists = () => {

  const axiosPublic = useAxiosPublic();

  const { data: products, isLoading } = useQuery({
    queryKey: ['Products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/product');
      return res?.data;
    }
  })


  console.log(products);

  if (isLoading) return <div className="p-6">Loading...</div>;


  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead className="bg-[#22404B] text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Stock</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((prod, idx) => (
            <tr key={prod._id} className="border-b hover:bg-gray-50 transition-all">
              <td className="py-3 px-4">{idx + 1}</td>
              <td className="py-3 px-4">{prod?.name}</td>
              <td className="py-3 px-4">{prod?.category}</td>
              <td className="py-3 px-4">৳{prod?.price}</td>
              <td className="py-3 px-4">{prod?.stock}</td>
              <td className="py-3 px-4 text-center space-x-2">
                <Link to={'/dashboard/upload-product'}>
                  <button
                    onClick={() => handleEdit(prod)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => deleteMutation.mutate(prod._id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  title="Delete"
                >

                  <FaTrash />

                </button>
              </td>
            </tr>
          ))}
          {products?.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductLists;