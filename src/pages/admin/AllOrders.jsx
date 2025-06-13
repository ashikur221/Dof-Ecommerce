import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaCheck } from 'react-icons/fa';

const AllOrders = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // Fetch Orders
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axiosPublic.get('/order');
      return res.data;
    }
  });

  console.log(orders);

  // Confirm Order Mutation
  const confirmMutation = useMutation({
    mutationFn: (id) => axiosPublic.patch(`/order/${id}`, { status: 'confirmed' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    }
  });

  // Delete Order Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/order/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    }
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load orders.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-[#22404B] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4">{index + 1}</td>

                {/* Customer Info */}
                <td className="py-3 px-4">
                  <p className="font-medium">{order.name}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-sm text-gray-500">{order.address}</p>
                </td>

                {/* Product Info */}
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={order.product?.image}
                    alt={order.product?.name}
                    className="w-14 h-14 rounded object-cover border"
                  />
                  <div>
                    <p className="font-semibold">{order.product?.name}</p>
                    <p className="text-sm text-gray-600">৳{order.product?.price}</p>
                  </div>
                </td>

                {/* Order Total */}
                <td className="py-3 px-4 font-semibold text-[#22404B]">৳{order.total}</td>

                {/* Actions */}
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    onClick={() => confirmMutation.mutate(order._id)}
                    disabled={order.status === 'confirmed'}
                    className={`px-3 py-1 text-white text-sm rounded ${order.status === 'confirmed'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                      }`}
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(order._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllOrders;
