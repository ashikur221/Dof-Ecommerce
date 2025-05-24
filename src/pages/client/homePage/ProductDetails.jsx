import React from 'react';
import { useParams } from 'react-router-dom';
import { dofProducts } from '../../../lib/data/DataBase';

const ProductDetails = () => {
  const { id } = useParams();
  const product = dofProducts.find((item) => item.id === id);

  if (!product) return <div className="text-center py-10">পণ্যটি খুঁজে পাওয়া যায়নি।</div>;

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-xl shadow" />
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <p className="text-xl text-orange-500 font-bold mb-4">
            মূল্য: {product.discountPrice}৳
            <span className="text-gray-400 line-through text-base ml-2">{product.price}৳</span>
          </p>

          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-2">স্পেসিফিকেশন:</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.specs.map((spec, idx) => (
                <li key={idx}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
