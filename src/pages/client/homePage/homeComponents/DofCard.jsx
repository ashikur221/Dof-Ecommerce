import React from 'react';
import { Link } from 'react-router-dom';
import { dofProducts } from '../../../../lib/data/DataBase';




const DofCard = () => {
  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-[#f59121] mb-6">দফ প্রোডাক্টস</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dofProducts?.map((item) => (
          <Link
            to={`/dof/${item.id}`}
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center"
          >
            <img src={item.image} alt={item.name} className=" w-full object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold text-[#f59121]">{item.name}</h3>
            <p className="text-gray-700">
              {item.discountPrice}৳ <span className="line-through text-gray-400">{item.price}৳</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DofCard;
