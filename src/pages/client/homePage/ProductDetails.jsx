import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product/${id}`);
      return res?.data;
    }
  });

  if (isLoading) return <div className="text-center py-10">লোড হচ্ছে...</div>;
  if (!product) return <div className="text-center py-10">পণ্যটি খুঁজে পাওয়া যায়নি।</div>;

  // Combine main image with additional images
  const allImages = [product.image, ...(product.images || [])];

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery Section */}
        <div className="w-full md:w-1/2">
          {/* Main Image */}
          <div className="mb-4 rounded-xl overflow-hidden shadow-lg">
            <img
              src={allImages[selectedImage]}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex flex-wrap gap-2">
            {allImages.map((img, index) => (
              <div
                key={index}
                className={`w-16 h-16 cursor-pointer border-2 rounded-md overflow-hidden transition-all
                  ${selectedImage === index ? 'border-orange-500' : 'border-transparent'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`${product.name} preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col justify-center md:w-1/2">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">{product.name}</h1>

          {/* Category and Stock */}
          <div className="flex gap-4 mb-4 text-sm text-gray-600">
            <span>ক্যাটাগরি: {product.category}</span>
            <span>স্টক: {product.stock}</span>
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-6">
            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-xl text-orange-500 font-bold">
              মূল্য: {product.discountPrice}৳
              {product.discountPrice < product.price && (
                <span className="text-gray-400 line-through text-base ml-2">
                  {product.price}৳
                </span>
              )}
            </p>
            {product.discountPrice < product.price && (
              <p className="text-green-600 text-sm mt-1">
                আপনি সাশ্রয় করছেন: {product.price - product.discountPrice}৳
              </p>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-6">
            <h3 className="font-bold text-lg mb-2">বিশেষ বিবরণ</h3>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product?.specs }} />
          </div>

          {/* Action Buttons */}
          {/* <div className="flex gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors">
              অর্ডার করুন
            </button>
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-md transition-colors">
              কার্টে যোগ করুন
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;