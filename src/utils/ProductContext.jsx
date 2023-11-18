import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (page) => {
    setCurrentPage(page);
  };


  
  
  /* --------- FAVORITOS ---------- */

  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (productId) => {
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
  };

  const isFavorite = (productId) => favorites.includes(productId);

  /* --------- FAVORITOS ---------- */




  useEffect(() => {
    async function fetchProducts() {
      try {
        /*const token = localStorage.getItem('token'); // token del localStorage
        const headers = {
          Authorization: `Bearer ${token}`,
        };*/

        const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products?page=${currentPage - 1}`/*, {
          headers,
        }*/);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        //setLastUpdate(Date.now()); // Actualiza el estado de la última actualización
        console.log('esta es la data: ', data)
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    }

    fetchProducts();
  }, [currentPage]);


  const getProductById = async (productId) => {
    try {
      /*const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };*/

      console.log("productID del getProductById: ", productId)

      const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/${productId}`/*, {
        headers,
      }*/);

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



  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      console.log('ProductID en el PD antes de reuqtes: ', productId);
      console.log('Header en DELETE: ', headers);
      const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/${productId}`, {
        method: 'DELETE',
        headers,
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete product', response);
      }
  
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };


  useEffect(() => {
    async function fetchCharacteristics() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/characteristics', {
          headers,
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setCharacteristics(data);
        console.log('Characteristics data:', data);
      } catch (error) {
        console.error('Error fetching characteristics', error);
      }
    }
  
    fetchCharacteristics();
  }, []);


  const searchProducts = async (searchQuery, categoryName) => {

    console.log('searchQuery pasada: ' + searchQuery + ' categoryname pasada: ' + categoryName)
    try {
      const response = await fetch(
        `http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/search?page=0&product=${searchQuery}&categoryName=${categoryName}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data);
      console.log('Searched products data:', data);
    } catch (error) {
      console.error('Error searching for products', error);
    }
  };



  const fetchProductSuggestions = async (searchQuery) => {
    try {
      const response = await fetch(
        `http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/search?page=0&product=${searchQuery}&categoryName=""`
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const resp = await response.json();

      const data = resp.content;

      console.log('DATA: ', data);
  
      // Ensure data is an array before mapping
      const suggestions = Array.isArray(data)
        ? data.map((product) => ({
            label: product.name, // Adjust based on your product structure
            value: product.productId, // Adjust based on your product structure
          }))
        : [];
  
      return suggestions;
    } catch (error) {
      console.error('Error fetching product suggestions', error);
      throw error;
    }
  };
  

  return (
    <ProductContext.Provider value={{products, setProducts, lastUpdate, getProductById, updateProduct, handleDelete, characteristics, setCharacteristics, searchProducts, favorites, addToFavorites, removeFromFavorites, isFavorite, fetchProductSuggestions,  currentPage, setCurrentPage, changePage,}}>
      {children}
    </ProductContext.Provider>
  );
}