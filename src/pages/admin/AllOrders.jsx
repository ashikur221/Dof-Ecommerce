import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaCheck } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [filterStatus, setFilterStatus] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  // Fetch Orders
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['orders', filterStatus, searchPhone],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sort-order?status=${filterStatus}&phone=${searchPhone}`);
      return res.data;
    }
  });

  // Change Status Mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => axiosSecure.patch(`/order/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success('Status updated successfully');
    }
  });

  // Delete Order Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/order/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success('Order deleted successfully');
    }
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load orders.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <select
          className="border px-4 py-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Delivered">Delivered</option>
        </select>

        <input
          type="text"
          placeholder="Search by phone"
          className="border px-4 py-2 rounded"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchPhone(e.target.value);
            }
          }}
        />
        {searchPhone && (
          <button
            onClick={() => setSearchPhone('')}
            className="ml-2 text-sm text-white bg-red-500 py-2 px-5 rounded"
          >
            Clear
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-[#22404B] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
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

                <td className="py-3 px-4">
                  <p className="font-medium">{order.name}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-sm text-gray-500">{order.address}</p>
                </td>

                <td className="py-3 px-4">
                  <p className="font-semibold">{order.product?.name}</p>
                  <p className="text-sm text-gray-600">৳{order.product?.price}</p>
                </td>

                <td className="py-3 px-4 font-semibold text-[#22404B]">৳{order.total}</td>

                <td className="py-3 px-4">
                  <select
                    className="border rounded px-2 py-1"
                    value={order.status}
                    onChange={(e) => statusMutation.mutate({ id: order._id, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

                <td className="py-3 px-4 text-center space-x-2">
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
                <td colSpan="6" className="text-center py-6 text-gray-500">
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
