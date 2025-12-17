import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, ArrowLeft, Loader2, Heart } from 'lucide-react';
import { generateProducts } from '../data/helper';
import { ProductCarouselPlugin } from './imageCard';

export const ProductCard = ({ product, onClick, isLoading }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(product.id)}
    >
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 {imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="p-5">
        <div className="text-xs font-semibold text-blue-600 mb-2">{product.category}</div>
        <h3 className="font-bold text-lg mb-2 text-gray-800 truncate">{product.name}</h3>

        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 text-sm font-semibold">{product.rating}</span>
          <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ${Math.floor(product.price / (1 - product.discount / 100))}
              </span>
            )}
          </div>
          <div className={`text-xs font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetail = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API call with loader
    // setLoading(true);
    // setImageLoaded(false);
    const timer = setTimeout(() => {
      const products = generateProducts();
      console.log('products',products);
      setProduct(products.find(p => p.id === productId));
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-blue-600 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
                  {/* {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    </div>
                  )} */}
                  <ProductCarouselPlugin images={product.images} name={product.name} />
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                      Save {product.discount}%
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div>
              <div className="text-sm font-semibold text-blue-600 mb-2">{product.category}</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-bold text-gray-900">{product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-2xl text-gray-400 line-through">
                      ${Math.floor(product.price / (1 - product.discount / 100))}
                    </span>
                  )}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Key Features</h2>
                <ul className="space-y-2">
                  {product?.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-xl"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <button
                  disabled={!product.inStock}
                  className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 inline mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
