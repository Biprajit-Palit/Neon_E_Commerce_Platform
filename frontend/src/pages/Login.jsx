import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg border-2 transition-all ${image === item ? 'border-purple-400' : 'border-transparent'}`}
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto rounded-2xl' src={image} alt={productData.name} />
          </div>
        </div>

        {/* Info */}
        <div className='flex-1'>
          <h1 className='font-semibold text-2xl mt-2 text-gray-900'>{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="" className="w-3.5" />)}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2 text-sm text-gray-400'>(122 reviews)</p>
          </div>

          <p className='mt-5 text-3xl font-semibold' style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {currency}{productData.price}
          </p>

          <p className='mt-4 text-gray-500 md:w-4/5 leading-relaxed text-sm'>{productData.description}</p>

          <div className='flex flex-col gap-3 my-8'>
            <p className='text-sm font-medium text-gray-700 tracking-wide'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 text-sm rounded-lg transition-all duration-200 ${item === size ? 'border-purple-500 bg-purple-50 text-purple-700 font-medium' : 'border-gray-200 hover:border-purple-300 text-gray-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className='text-white px-10 py-3 text-sm font-medium tracking-widest rounded-full active:opacity-80 transition-all'
            style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5 border-gray-100' />

          <div className='text-sm text-gray-400 mt-5 flex flex-col gap-2'>
            <p>✓ 100% authentic product, every time.</p>
            <p>✓ Cash on delivery available.</p>
            <p>✓ Easy returns & exchanges within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border-b-2 border-purple-500 px-5 py-3 text-sm text-gray-800'>Description</b>
          <p className='border-b border-gray-100 px-5 py-3 text-sm text-gray-400'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-gray-100 rounded-b-2xl px-6 py-6 text-sm text-gray-400 leading-relaxed'>
          <p>
            Every Neon piece is crafted with intention. We work directly with skilled manufacturers to ensure each garment meets our standards for material quality, construction, and comfort. What you see is what you get — no airbrushing, no surprises.
          </p>
          <p>
            This item features premium fabric composition, reinforced stitching at stress points, and a fit designed for real bodies. Whether you're dressing up or dressing down, it's built to move with you.
          </p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product