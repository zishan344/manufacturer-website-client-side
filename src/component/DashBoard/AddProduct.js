import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  FiPackage, 
  FiImage, 
  FiDollarSign, 
  FiLayers, 
  FiFileText,
  FiCheck,
  FiPlus,
  FiUpload
} from "react-icons/fi";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch
  } = useForm();

  const imageUrl = watch("url");

  React.useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { description, min_order, price, product_name, stock, url } = data;
      const product = {
        name: product_name,
        image: url,
        description,
        price: Number(price),
        minimum_order: Number(min_order),
        product_quantity: Number(stock),
      };

      const response = await fetch("https://autovantis.onrender.com/product", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success("Product added successfully!");
        reset();
        setImagePreview(null);
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ 
    label, 
    name, 
    type = "text", 
    placeholder, 
    icon: Icon, 
    validation, 
    className = "" 
  }) => (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
        <Icon size={16} className="text-emerald-600" />
        <span>{label}</span>
      </label>
      <input
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${className}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm flex items-center space-x-1">
          <span>⚠️</span>
          <span>{errors[name].message}</span>
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <FiPlus className="text-white" size={20} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Add New Product
          </h1>
        </div>
        <p className="text-gray-600">Create a new product listing for your inventory</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-8">
          {/* Product Image Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Product Name */}
              <InputField
                label="Product Name"
                name="product_name"
                placeholder="Enter product name"
                icon={FiPackage}
                validation={{
                  required: "Product name is required",
                  minLength: {
                    value: 3,
                    message: "Product name must be at least 3 characters"
                  }
                }}
              />

              {/* Image URL */}
              <InputField
                label="Product Image URL"
                name="url"
                placeholder="https://example.com/image.jpg"
                icon={FiImage}
                validation={{
                  required: "Image URL is required",
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                    message: "Please enter a valid image URL"
                  }
                }}
              />

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FiFileText size={16} className="text-emerald-600" />
                  <span>Product Description</span>
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters"
                    }
                  })}
                  placeholder="Describe your product features, benefits, and specifications..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.description.message}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Image Preview */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Preview
              </label>
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview(null)}
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <FiUpload size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Price ($)"
              name="price"
              type="number"
              placeholder="99.99"
              icon={FiDollarSign}
              validation={{
                required: "Price is required",
                min: {
                  value: 0.01,
                  message: "Price must be greater than 0"
                }
              }}
            />

            <InputField
              label="Minimum Order"
              name="min_order"
              type="number"
              placeholder="1"
              icon={FiLayers}
              validation={{
                required: "Minimum order is required",
                min: {
                  value: 1,
                  message: "Minimum order must be at least 1"
                }
              }}
            />

            <InputField
              label="Available Stock"
              name="stock"
              type="number"
              placeholder="100"
              icon={FiPackage}
              validation={{
                required: "Stock quantity is required",
                min: {
                  value: 0,
                  message: "Stock cannot be negative"
                }
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Adding Product...</span>
                </>
              ) : (
                <>
                  <FiCheck size={20} />
                  <span>Add Product</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Background Elements */}
      <div className="fixed top-1/4 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-10 w-20 h-20 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none"></div>
    </div>
  );
};

export default AddProduct;
