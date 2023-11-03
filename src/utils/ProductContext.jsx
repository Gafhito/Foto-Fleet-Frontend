import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch('http://ec2-35-173-183-241.compute-1.amazonaws.com/api/products?page=0', {
          headers,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}