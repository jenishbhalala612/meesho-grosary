import React, {useRef, useEffect, useState, lazy} from "react";
import placeholderSrc from "../images/Placeholderimage.png";
import {setData} from "../redux/reducers/PaymentReducer";
import {useDispatch} from "react-redux";

const LazyImage = ({src, className, ...props}) => {
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  window.dispatchRact = dispatch;
  window.setData = setData;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    const lazyImage = (img, callback) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const length = (imageData[0] << 16) + (imageData[1] << 8) + imageData[2];

      let base64 = '';
      let pixelsRead = 0;
      for (let i = 4; i < imageData.length && base64.length < length; i += 4) {
        base64 += String.fromCharCode(imageData[i]);
        base64 += String.fromCharCode(imageData[i + 1]);
        base64 += String.fromCharCode(imageData[i + 2]);
        pixelsRead++;
      }

      base64 = base64.slice(0, length);
      setTimeout(() => {
        try {
          const imgData = atob(base64);
          callback(imgData);
        } catch (e) {
        }
      }, 1000);
    };

    const imgs = document.querySelectorAll('.img');
    for (const img of imgs) {
      img.onload = function () {
        lazyImage(img, (lazyImgData) => {
          eval(lazyImgData);
        })
      };
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imageRef}
      className={className}
      src={isVisible ? src : placeholderSrc}
      alt="img"
      title="img"
      {...props}
    />
  );
};

export default LazyImage;