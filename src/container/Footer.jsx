import React from "react";

function Footer() {
  return (
    <footer className="mt-4 border-t border-gray-200 bg-[#f8f8ff]">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-10 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <h2 className="text-[22px] font-bold text-[#353543]">
            Shop Non-Stop
          </h2>
          <p className="mt-3 max-w-xl text-[13px] leading-6 text-[#616173]">
            Discover fashion, home, beauty and everyday products at great prices.
            Browse your favourite products and shop from anywhere.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#353543]">Useful Links</h3>
          <div className="mt-3 space-y-2 text-[13px] text-[#616173]">
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Terms & Conditions</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[#353543]">Customer Care</h3>
          <div className="mt-3 space-y-2 text-[13px] text-[#616173]">
            <p>Help Center</p>
            <p>Returns</p>
            <p>Track Order</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-4 py-4 text-center text-[12px] text-gray-500">
        © 2026. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
