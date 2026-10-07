import React, { useRef, useEffect, useState } from "react";
import placeholderSrc from "../images/Meesho_logo.png";
const LazyloaderImage = ({ src, className, ...props }) => {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      style={!isVisible ? { height: "50px", width: "auto", objectFit: "contain" } : {}}
      src={isVisible ? src : placeholderSrc}
      alt="img"
      title="img"
      {...props}
    />
  );
};

export default LazyloaderImage;