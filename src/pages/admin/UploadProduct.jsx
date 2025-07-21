import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadImg } from '../../uploadFile/UploadImg';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { Editor } from '@tinymce/tinymce-react';

const tinymceApiKey = import.meta.env.VITE_TINYMCE_API_KEY;

const UploadProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const axiosSecure = useAxiosSecure();
  const [featuredPreview, setFeaturedPreview] = useState(null);
  const [productPreviews, setProductPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Uploading product...');

    try {
      // Upload featured image
      const featuredImageFile = featuredPreview
        ? productPreviews.length > 0
          ? productPreviews[0].file
          : data.featuredImage[0]
        : data.featuredImage[0];
      const featuredImageUrl = await uploadImg(featuredImageFile);

      // Upload product images
      const productImagesFiles = productPreviews.map(p => p.file);
      const productImagesUrls = await Promise.all(
        productImagesFiles.map(file => uploadImg(file))
      );

      // Prepare product data
      const productData = {
        name: data.title,
        description: description, // Use TinyMCE content
        image: featuredImageUrl,
        images: productImagesUrls,
        specs: specification ? specification.split('\n').filter(spec => spec.trim()) : [],
        price: data.price,
        discountPrice: data.discountPrice || data.price,
        category: data.category,
        stock: data.stock || 0
      };

      console.log(productData);

      // Submit to backend
      // const response = await axiosSecure.post('/products', productData);

      // if (response.data) {
      //   toast.success('Product uploaded successfully!', { id: toastId });
      //   reset();
      //   setDescription('');
      //   setSpecification('');
      //   setUploadedImages([]);
      // }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload product', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upload Product</h1>
      <form
        className=" bg-white p-6 rounded shadow space-y-5"
        onSubmit={handleSubmit(onSubmit)}
        id="upload-product-form"
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
          {!description.trim() && (
            <p className="text-red-500 text-sm mt-1">Description is required</p>
          )}
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
            {...register("featuredImage", {
              required: "Featured image is required",
              validate: {
                fileSize: (files) => {
                  if (files[0] && files[0].size > 5 * 1024 * 1024) {
                    return "File size must be less than 5MB";
                  }
                  return true;
                },
                fileType: (files) => {
                  if (files[0] && !files[0].type.startsWith('image/')) {
                    return "File must be an image";
                  }
                  return true;
                }
              }
            })}
            accept="image/*"
            className={`w-full ${errors.featuredImage ? 'border-red-500' : ''}`}
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                setFeaturedPreview(URL.createObjectURL(file));
              } else {
                setFeaturedPreview(null);
              }
            }}
          />
          {featuredPreview && (
            <div className="mt-2 relative w-fit">
              <img src={featuredPreview} alt="Preview" className="h-24 rounded shadow" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                onClick={() => {
                  setFeaturedPreview(null);
                  setValue('featuredImage', null);
                  // Clear the input value
                  document.getElementById('featuredImage').value = '';
                }}
              >
                ✕
              </button>
            </div>
          )}
          {errors.featuredImage && (
            <p className="text-red-500 text-sm mt-1">{errors.featuredImage.message}</p>
          )}
        </div>

        {/* Product Images */}
        <div>
          <label className="block font-medium mb-1" htmlFor="productImgs">Product Images (Optional)</label>
          <input
            type="file"
            id="productImgs"
            multiple
            {...register("productImgs", {
              validate: {
                fileSize: (files) => {
                  if (files) {
                    for (let file of files) {
                      if (file.size > 5 * 1024 * 1024) {
                        return "Each file must be less than 5MB";
                      }
                    }
                  }
                  return true;
                },
                fileType: (files) => {
                  if (files) {
                    for (let file of files) {
                      if (!file.type.startsWith('image/')) {
                        return "All files must be images";
                      }
                    }
                  }
                  return true;
                }
              }
            })}
            accept="image/*"
            className={`w-full ${errors.productImgs ? 'border-red-500' : ''}`}
            onChange={e => {
              const files = Array.from(e.target.files);
              setProductPreviews(files.map(file => ({
                file,
                url: URL.createObjectURL(file)
              })));
            }}
          />
          {productPreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {productPreviews.map((img, idx) => (
                <div key={idx} className="relative w-fit">
                  <img src={img.url} alt={`Preview ${idx}`} className="h-20 rounded shadow" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                    onClick={() => {
                      const newPreviews = productPreviews.filter((_, i) => i !== idx);
                      setProductPreviews(newPreviews);
                      // Update the input value and react-hook-form
                      const dt = new DataTransfer();
                      newPreviews.forEach(p => dt.items.add(p.file));
                      document.getElementById('productImgs').files = dt.files;
                      setValue('productImgs', dt.files);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.productImgs && (
            <p className="text-red-500 text-sm mt-1">{errors.productImgs.message}</p>
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
          disabled={isSubmitting || !description.trim()}
          className="bg-[#22404B] text-white px-6 py-2 rounded hover:bg-[#18313a] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Uploading...
            </>
          ) : (
            'Upload Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;