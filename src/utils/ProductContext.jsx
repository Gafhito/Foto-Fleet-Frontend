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
        /*const token = localStorage.getItem('token'); // token del localStorage
        const headers = {
          Authorization: `Bearer ${token}`,
        };*/

        const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products?page=0'/*, {
          headers,
        }*/);

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


  const getProductById = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/${productId}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data; // Devuelve los detalles del producto
    } catch (error) {
      console.error('Error al obtener detalles del producto', error);
      throw error;
    }
  };


  const updateProduct = async (productId, updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/${productId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedProduct),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
  
      // Optionally, update the local state with the new data
      // This depends on whether you want to re-fetch the data or not
  
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{products, getProductById, updateProduct}}>
      {children}
    </ProductContext.Provider>
  );
}