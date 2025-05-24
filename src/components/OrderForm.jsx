import React, { useState } from 'react';
import { dofProducts } from '../lib/data/DataBase';

const OrderForm = () => {
  const [selectedProduct, setSelectedProduct] = useState(dofProducts[0]);
  const [delivery, setDelivery] = useState(50); // Default: Inside Dhaka

  const subtotal = selectedProduct.discountPrice;
  const total = subtotal + delivery;

  return (
    <div className="w-11/12 max-w-3xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-[#f59121]">Billing & Shipping</h2>

      <form className="space-y-4 bg-white p-6 rounded shadow-md">
        {/* User Inputs */}
        <div>
          <label className="block font-medium">আপনার নাম *</label>
          <input type="text" placeholder="আপনার নাম লিখুন..." className="w-full border px-4 py-2 rounded mt-1" required />
        </div>

        <div>
          <label className="block font-medium">মোবাইল নাম্বার *</label>
          <input type="tel" placeholder="আপনার মোবাইল নাম্বার লিখুন..." className="w-full border px-4 py-2 rounded mt-1" required />
        </div>

        <div>
          <label className="block font-medium">আপনার ঠিকানা *</label>
          <input type="text" placeholder="আপনার ঠিকানা লিখুন..." className="w-full border px-4 py-2 rounded mt-1" required />
        </div>

        <div>
          <label className="block font-medium">প্রোডাক্ট নির্বাচন করুন *</label>
          <select
            className="w-full border px-4 py-2 rounded mt-1"
            value={selectedProduct.id}
            onChange={(e) => {
              const product = dofProducts.find(p => p.id === e.target.value);
              setSelectedProduct(product);
            }}
          >
            {dofProducts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} - {item.discountPrice}৳
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">ডেলিভারি অপশন:</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="delivery" value={50} checked={delivery === 50} onChange={() => setDelivery(50)} />
              Inside Dhaka (+৫০৳)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="delivery" value={80} checked={delivery === 80} onChange={() => setDelivery(80)} />
              Outside Dhaka (+৮০৳)
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

        {/* Payment Method (Fixed) */}
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
