import React, { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if data is already cached
    const cachedProducts = localStorage.getItem('autovantis_products');
    const cacheTime = localStorage.getItem('autovantis_products_time');
    const now = new Date().getTime();
    
    // Use cache if it's less than 5 minutes old
    if (cachedProducts && cacheTime && (now - parseInt(cacheTime)) < 300000) {
      setProducts(JSON.parse(cachedProducts));
      setLoading(false);
      return;
    }

    // Fetch with timeout and error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    fetch("https://autovantis.onrender.com/products", {
      signal: controller.signal
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
        // Cache the data
        localStorage.setItem('autovantis_products', JSON.stringify(data));
        localStorage.setItem('autovantis_products_time', now.toString());
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error('Products fetch error:', err);
        setError(err.message);
        setLoading(false);
        // Use cached data as fallback if available
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts));
        }
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return [products, setProducts, loading, error];
};
