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
        const token = localStorage.getItem('token'); // token del localStorage
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products?page=0', {
          headers,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        console.log('esta es la data: ', data)
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