import { useEffect, useRef, useState } from "react";

function LazyImage({ src, lowResSrc, alt, className, srcSet, sizes }) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="relative w-full h-full overflow-hidden">
      {lowResSrc && (
        <img
          src={lowResSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100 blur-md scale-105"
          }`}
        />
      )}

      {isVisible && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}
    </div>
  );
}

export default LazyImage;
