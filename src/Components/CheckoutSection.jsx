import React from 'react'

const Input = ({ placeholder, className = '' }) => (
  <input
    placeholder={placeholder}
    className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2EBAC6] focus:border-[#2EBAC6] ${className}`}
  />
)

const ProductRow = ({ img, title, desc, price }) => (
  <div className="py-3">
    <div className="flex items-center gap-3">
      <img src={img} alt={title} className="w-14 h-14 rounded-md object-cover" />
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-700 leading-snug">{title}</div>
        <div className="text-xs text-gray-400 leading-snug">{desc}</div>
      </div>
      <div className="text-sm font-medium text-gray-800">{price}</div>
    </div>
    <div className="border-b border-gray-300 my-3" />
  </div>
)

const CheckoutSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-[#1E2B4A] font-semibold text-xl">Checkout</h2>
            <div className="mt-4 text-sm text-gray-500">Cart Type</div>

            {/* logos */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {['/img/paypal.png','/img/amex.png','/img/visa.png','/img/mastercard.png'].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="payment"
                  className="h-10 w-auto rounded-md border border-gray-200 p-2 hover:border-teal-400 transition"
                />
              ))}
            </div>

            {/* form fields */}
            <div className="mt-6 space-y-4">
              <Input placeholder="Name on Card" />
              <Input placeholder="Card Number" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Expiration Date (MM/YY)" />
                <Input placeholder="CVC" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" className="w-4 h-4 text-[#2EBAC6] rounded border-gray-300" />
                Save my information for faster checkout
              </label>
              <button className="w-full bg-[#2EBAC6] hover:bg-[#24a3b1] text-white font-semibold py-3 rounded-md transition">
                Confirm Payment
              </button>
            </div>
          </div>

          {/* Right: summary */}
          <div className="bg-[#F3F8FC] rounded-2xl shadow p-6 md:p-8">
            <h3 className="text-gray-800 font-semibold">Summary</h3>
            <div className="mt-4">
              <ProductRow img="/img/h4.jpg" title="adipiscing elit, sed do eiusmod tempor" desc="Lorem ipsum dollar..." price="$24.69" />
              <ProductRow img="/img/h4.jpg" title="sed do eiusmod tempor adipiscing elit" desc="Lorem ipsum dollar..." price="$24.69" />
            </div>
            {/* totals */}
            <div className="text-sm">
              <div className="flex justify-between py-2 border-b border-gray-300"><span>Subtotal</span><span>$51.38</span></div>
              <div className="flex justify-between py-2 border-b border-gray-300"><span>Coupon Discount</span><span>0 %</span></div>
              <div className="flex justify-between py-2 border-b border-gray-300"><span>TAX</span><span>5</span></div>
              <div className="flex justify-between py-3 font-semibold text-black"><span>Total</span><span>$56.38</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutSection


