import React from 'react';
import useGetAllProduct from '../../hooks/useGetAllProduct';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ProductLists = () => {

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['Products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/product');
      return res?.data;
    }
  })


  console.log(products);

  if (isLoading) return <div className="p-6">Loading...</div>;

  const deleteProduct = (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          const res = await axiosSecure.delete(`/product/${id}`);
          if (res) {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success"
            });
          }
          refetch();
        } catch (error) {
          toast.error(error?.response?.data?.message || 'Something went wrong');
        }


      }
    });
  }

  return (
    <div className="overflow-x-auto p-4">

      <div className="flex justify-end">
        <Link
          to={'/dashboard/upload-product'}
        >
          <button className='bg-primary text-white px-4 py-2 rounded my-4'>Add Product</button>
        </Link>
      </div>

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
                <Link to={`/dashboard/edit-product/${prod?._id}`}>
                  <button
                  
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => deleteProduct(prod._id)}
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