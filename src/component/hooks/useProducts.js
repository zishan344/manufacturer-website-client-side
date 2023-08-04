import React, { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://autovantis.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return [products, setProducts];
};
