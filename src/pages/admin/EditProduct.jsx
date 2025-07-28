import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { uploadImg } from '../../uploadFile/UploadImg';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const tinymceApiKey = import.meta.env.VITE_TINYMCE_API_KEY;

const EditProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [featuredPreview, setFeaturedPreview] = useState(null);
  const [featuredFile, setFeaturedFile] = useState(null);
  const [productPreviews, setProductPreviews] = useState([]);
  const [existingProduct, setExistingProduct] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/product/${id}`);
        const product = res.data;
        setExistingProduct(product);
        setValue('title', product.name);
        setValue('category', product.category);
        setValue('price', product.price);
        setValue('discountPrice', product.discountPrice);
        setValue('stock', product.stock);
        setDescription(product.description || '');
        setSpecification(product.specs);
        setFeaturedPreview(product.image);
        setProductPreviews(
          (product.images || []).map(url => ({ file: null, url }))
        );
      } catch (err) {
        toast.error('Failed to fetch product');
      }
    };
    fetchProduct();
    // eslint-disable-next-line
  }, [id, setValue]);

  // Handle featured image change
  const handleFeaturedChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedPreview(URL.createObjectURL(file));
      setFeaturedFile(file);
    } else {
      setFeaturedPreview(existingProduct?.image || null);
      setFeaturedFile(null);
    }
  };

  // Handle product images change
  const handleProductImgsChange = (e) => {
    const files = Array.from(e.target.files);
    setProductPreviews([
      ...productPreviews,
      ...files.map(file => ({ file, url: URL.createObjectURL(file) }))
    ]);
  };

  // Remove a product image
  const removeProductImg = (idx) => {
    setProductPreviews(productPreviews.filter((_, i) => i !== idx));
  };

  // Remove featured image
  const removeFeaturedImg = () => {
    setFeaturedPreview(null);
    setFeaturedFile(null);
    // Optionally, you can set a flag to remove the image from backend
  };

  // Submit handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Updating product...');
    try {
      // Upload new featured image if changed
      let featuredImageUrl = existingProduct?.image;
      if (featuredFile) {
        featuredImageUrl = await uploadImg(featuredFile);
      }

      // Upload new product images if any
      const uploadedImgs = await Promise.all(
        productPreviews.map(async (img) => {
          if (img.file) {
            return await uploadImg(img.file);
          }
          return img.url; // already uploaded
        })
      );

      // Prepare product data
      const productData = {
        name: data.title,
        description,
        image: featuredImageUrl,
        images: uploadedImgs,
        specs: specification,
        price: data.price,
        discountPrice: data.discountPrice || data.price,
        category: data.category,
        stock: data.stock || 0
      };

      // Update product
      await axiosSecure.put(`/product/${id}`, productData);

      toast.success('Product updated!', { id: toastId });
      navigate('/dashboard/product-list'); // Change to your product list route
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!existingProduct) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form
        className="    bg-white p-6 rounded shadow space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-1" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Title must be at least 3 characters" }
            })}
            className={`w-full border px-3 py-2 rounded ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Product Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description - TinyMCE */}
        <div>
          <label className="block font-medium mb-1" htmlFor="description">Description</label>
          <Editor
            apiKey={tinymceApiKey}
            value={description}
            onEditorChange={(content) => {
              setDescription(content);
              setValue('description', content);
            }}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14}'
            }}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1" htmlFor="category">Category</label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={`w-full border px-3 py-2 rounded ${errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home & Garden</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1" htmlFor="price">Price (৳)</label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" }
            })}
            className={`w-full border px-3 py-2 rounded ${errors.price ? 'border-red-500' : ''}`}
            placeholder="0"
            step="0.01"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Discount Price */}
        <div>
          <label className="block font-medium mb-1" htmlFor="discountPrice">Discount Price (৳) - Optional</label>
          <input
            type="number"
            id="discountPrice"
            {...register("discountPrice", {
              min: { value: 0, message: "Discount price must be positive" }
            })}
            className={`w-full border px-3 py-2 rounded ${errors.discountPrice ? 'border-red-500' : ''}`}
            placeholder="Leave empty if no discount"
            step="0.01"
          />
          {errors.discountPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.discountPrice.message}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium mb-1" htmlFor="stock">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            {...register("stock", {
              required: "Stock quantity is required",
              min: { value: 0, message: "Stock must be non-negative" }
            })}
            className={`w-full border px-3 py-2 rounded ${errors.stock ? 'border-red-500' : ''}`}
            placeholder="0"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Featured Image */}
        <div>
          <label className="block font-medium mb-1" htmlFor="featuredImage">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            accept="image/*"
            className={`w-full ${errors.featuredImage ? 'border-red-500' : ''}`}
            onChange={handleFeaturedChange}
          />
          {featuredPreview && (
            <div className="mt-2 relative w-fit">
              <img src={featuredPreview} alt="Preview" className="h-24 rounded shadow" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                onClick={removeFeaturedImg}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Product Images */}
        <div>
          <label className="block font-medium mb-1" htmlFor="productImgs">Product Images (Optional)</label>
          <input
            type="file"
            id="productImgs"
            accept="image/*"
            multiple
            className={`w-full ${errors.productImgs ? 'border-red-500' : ''}`}
            onChange={handleProductImgsChange}
          />
          {productPreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {productPreviews.map((img, idx) => (
                <div key={idx} className="relative w-fit">
                  <img src={img.url} alt={`Preview ${idx}`} className="h-20 rounded shadow" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                    onClick={() => removeProductImg(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specification - TinyMCE */}
        <div>
          <label className="block font-medium mb-1" htmlFor="specification">Specification (Optional)</label>
          <Editor
            apiKey={tinymceApiKey}
            value={specification}
            onEditorChange={(content) => {
              setSpecification(content);
              setValue('specification', content);
            }}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14}'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#22404B] text-white px-6 py-2 rounded hover:bg-[#18313a] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Updating...
            </>
          ) : (
            'Update Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;