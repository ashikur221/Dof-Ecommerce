import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const OrderForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/product');
      return res?.data || [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [delivery, setDelivery] = useState(130); // Default: Inside Dhaka

  // Set the first product as selected when products load
  useEffect(() => {
    if (products && products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  const subtotal = selectedProduct?.discountPrice || selectedProduct?.price || 0;
  const total = parseFloat(subtotal) + parseFloat(delivery);

  const onSubmit = async (data) => {
    const fullData = {
      ...data,
      product: selectedProduct,
      delivery,
      subtotal,
      total
    };
    console.log("✅ Order Placed:", fullData);
    const toastId = toast.loading('Uploading....');
    try {
      const res = await axiosPublic.post('/order', fullData);
      if (res) {
        console.log(res?.data);
        toast.success('Your form submitted successfully', { id: toastId });
      }
    } catch (error) {
      toast.error('Some error occurred', { id: toastId });
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-11/12 max-w-3xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-[#f59121]">Billing & Shipping</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow-md">
        {/* Name */}
        <div>
          <label className="block font-medium">আপনার নাম *</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="আপনার নাম লিখুন..."
            className="w-full border px-4 py-2 rounded mt-1"
          />
          {errors.name && <p className="text-red-500 text-sm">নাম প্রয়োজন</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">মোবাইল নাম্বার *</label>
          <input
            {...register("phone", { required: true })}
            type="tel"
            placeholder="আপনার মোবাইল নাম্বার লিখুন..."
            className="w-full border px-4 py-2 rounded mt-1"
          />
          {errors.phone && <p className="text-red-500 text-sm">মোবাইল নাম্বার প্রয়োজন</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">আপনার ঠিকানা *</label>
          <input
            {...register("address", { required: true })}
            type="text"
            placeholder="আপনার ঠিকানা লিখুন..."
            className="w-full border px-4 py-2 rounded mt-1"
          />
          {errors.address && <p className="text-red-500 text-sm">ঠিকানা প্রয়োজন</p>}
        </div>

        {/* Product Selector */}
        <div>
          <label className="block font-medium">প্রোডাক্ট নির্বাচন করুন *</label>
          <select
            className="w-full border px-4 py-2 rounded mt-1"
            value={selectedProduct?._id || ''}
            onChange={(e) => {
              const product = products?.find(p => p._id === e.target.value);
              setSelectedProduct(product);
            }}
          >
            {products?.map((item) => (
              <option key={item._id} value={item._id}>
                {item?.name} - {item?.discountPrice || item?.price}৳
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Option */}
        <div>
          <label className="block font-medium mb-2">ডেলিভারি অপশন:</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value={70}
                checked={delivery === 70}
                onChange={() => setDelivery(70)}
              />
               Delivery Charge  (১৩০৳ সারা বাংলাদেশ)
            </label>
           
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Your Order</h3>
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>{subtotal}৳</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery</span>
            <span>{delivery}৳</span>
          </div>
          <div className="flex justify-between font-bold text-xl text-orange-600 mt-2">
            <span>Total</span>
            <span>{total}৳</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-100 p-4 rounded text-gray-700 text-sm">
          <p><strong>Cash on Delivery</strong> – পণ্য হাতে পাওয়ার পর পেমেন্ট করুন।</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#f59121] hover:bg-green-700 text-white font-semibold py-3 rounded text-lg transition"
        >
          PLACE ORDER {total}৳
        </button>
      </form>
    </div>
  );
};

export default OrderForm;