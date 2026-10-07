import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addtocartqtyActionMinus, addtocartqtyActionPlus, addtocartremoveAction } from "../redux/actions/AddTocart.action";
import { BaynowandaddtocartAction, BaynowandRemoveAction } from "../redux/actions/Baynowdata";
import LazyImage from "./LazyImage";

const money = (v) => {
  const n = Number(String(v ?? 0).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

function Cartpage({ data = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart = [] } = useSelector((s) => s?.cart || {});
  const { buydata = [] } = useSelector((s) => s?.buydata || {});
  const isBuyNow = buydata.length > 0;

  const items = useMemo(() => {
    if (isBuyNow) return buydata.map((p) => ({ ...p, qty: Number(p.qty) || 1 }));
    return data.filter((p) => cart.some((c) => c?.id === p?.id)).map((p) => {
      const c = cart.find((x) => x?.id === p?.id) || {};
      return { ...p, qty: Number(c.qty) || 1, yesnoval: c.yesnoval, free: c.free };
    });
  }, [data, cart, buydata, isBuyNow]);

  const unitPrice = (p) => p?.free ? 0 : money(p?.price) + (p?.yesnoval ? 20 : 0);
  const total = items.reduce((sum, p) => sum + unitPrice(p) * (Number(p.qty) || 1), 0);

  useEffect(() => {
    localStorage.setItem("ordertotal", String(total));
    window.scrollTo(0, 0);
  }, [total]);

  const minus = (p) => {
    if (isBuyNow) {
      if ((p.qty || 1) <= 1) return;
      dispatch(BaynowandaddtocartAction({ ...p, qty: p.qty - 1 }));
    } else dispatch(addtocartqtyActionMinus(p.id));
  };
  const plus = (p) => {
    if (isBuyNow) dispatch(BaynowandaddtocartAction({ ...p, qty: (p.qty || 1) + 1 }));
    else dispatch(addtocartqtyActionPlus(p.id));
  };
  const remove = (p) => isBuyNow ? dispatch(BaynowandRemoveAction()) : dispatch(addtocartremoveAction(p.id));

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-[92px]">
      <div className="w-full max-w-[500px] mx-auto bg-white min-h-screen">
        <div className="sticky top-0 z-50 bg-white border-b border-[#e4e4ec]">
          <div className="h-[52px] px-4 flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-2xl bg-transparent">‹</button>
            <span className="text-[13px] font-semibold">CART</span>
          </div>
          <div className="px-5 py-3 flex items-start">
            {[['1','Cart'],['2','Address'],['3','Payment'],['4','Summary']].map(([n,t],i)=>(
              <div key={t} className="flex-1 text-center relative">
                {i<3 && <div className="absolute top-[10px] left-1/2 w-full h-px bg-[#dddde6]"/>}
                <div className={`relative mx-auto w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[11px] ${i===0?'border-[#a02089] text-[#a02089] bg-white':'border-[#d5d5dd] text-[#aaa]'}`}>{n}</div>
                <div className={`mt-1 text-[10px] ${i===0?'text-[#a02089]':'text-[#aaa]'}`}>{t}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3">
          <h2 className="font-bold text-[17px] mb-3">Cart</h2>
          {items.map((p)=>(
            <div key={p.id} className="flex gap-3 py-3 border-b border-[#eee]">
              <LazyImage src={Array.isArray(p.image)?p.image[0]:p.image} className="w-[64px] h-[64px] rounded object-cover"/>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate">{p.name || p.title}</div>
                <div className="font-bold mt-1">₹{unitPrice(p)}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 text-[13px]"><span>Size : {p.size || '-'}</span><span>Qty :</span><button onClick={()=>minus(p)} className="w-6 h-6 border bg-white">−</button><b>{p.qty||1}</b><button onClick={()=>plus(p)} className="w-6 h-6 border bg-white">+</button></div>
                  <button onClick={()=>remove(p)} className="text-[12px] font-semibold bg-transparent">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-2 bg-[#f1f1f4]"/>
        <div className="p-3">
          <h3 className="font-bold mb-3">Delivery Options</h3>
          <label className="flex items-center justify-between border border-[#a02089] bg-[#fff7fd] rounded-lg p-3 mb-2">
            <div className="flex gap-3"><input type="radio" checked readOnly className="accent-[#a02089]"/><div><b className="text-[13px]">Standard Delivery</b><div className="text-[10px] text-gray-500">Delivery in 4 to 5 days</div></div></div><b className="text-green-600 text-[12px]">FREE</b>
          </label>
          <label className="flex items-center justify-between border rounded-lg p-3">
            <div className="flex gap-3"><input type="radio" readOnly/><div><b className="text-[13px]">Next Day Delivery</b><div className="text-[10px] text-gray-500">Fast delivery by tomorrow</div></div></div><b className="text-[12px]">₹49</b>
          </label>
        </div>

        <div className="h-2 bg-[#f1f1f4]"/>
        <div className="p-4 text-[13px]">
          <div className="flex justify-between py-2"><span>Total Product Price:</span><span>₹{total}</span></div>
          <div className="flex justify-between py-2 border-b"><span>Shipping:</span><b className="text-green-600">FREE</b></div>
          <div className="flex justify-between py-3 text-[15px] font-bold"><span>Order Total :</span><span>₹{total}</span></div>
        </div>
        <div className="mx-3 mb-4 border-2 border-black rounded p-5 bg-[#fafafa]">
          <div className="text-[#5c52c9] font-bold text-sm mb-3">🛡 Secure Shopping</div>
          <div className="text-[20px] font-bold text-[#44427b]">Your Safety, Our Priority</div>
          <div className="text-[12px] text-gray-600 mt-1">We make sure your package is safe at every point of contact.</div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
        <div className="max-w-[500px] mx-auto flex items-center gap-4 p-3">
          <div className="w-[38%]"><b>₹{total}</b><div className="text-[10px] font-bold text-[#a02089]">VIEW PRICE DETAILS</div></div>
          <button onClick={()=>{navigate('/addaddress');window.scrollTo(0,0)}} disabled={!items.length} className="flex-1 h-[44px] rounded bg-[#a02089] text-white font-bold disabled:opacity-50">Continue</button>
        </div>
      </div>
    </div>
  );
}
export default Cartpage;
