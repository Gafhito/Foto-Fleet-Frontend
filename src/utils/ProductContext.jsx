import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [favorites, setFavorites] = useState([]);

  const [dataUser, setDataUser] = useState(null)

  const [currentPage, setCurrentPage] = useState(1);

  const { getUserData } = useAuth();

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message, severity, open = true) => {
    setSnackbarMessage({
      message,
      severity,
      open,
    });
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };



  const initializeUserData = async () => {
    try {
      if (favorites.length === 0) {
        const data = await getUserData();
        setFavorites(data.favorites);
        setDataUser(data)
        return dataUser;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  /*initializeUserData();*/



  
  
  /* --------- FAVORITOS ---------- */


  const addToFavorites = async (productId, productName) => {
    // Actualizar el estado local
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  
    try {
      
      const authToken = localStorage.getItem('token');
  
  
      if (!authToken) {
        console.error('Token de autenticación no encontrado. No se puede realizar la solicitud.');
        return;
      }
  
      
      const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/user/favorite?productId=${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, 
        },
   
      });
  
    
      if (!response.ok) {
  
        console.error('Error al agregar a favoritos:', response.status, response.statusText);
      }else {
        console.log('ProductName: ', productName)

        showSnackbar(`Producto ${productName} agregado a favoritos`, 'success');
      }
    } catch (error) {

      console.error('Error en la solicitud POST:', error.message);
    }
  };
  

  const removeFromFavorites = async (productId, productName) => {
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
  
    try {
      const authToken = localStorage.getItem('token');
  
      if (!authToken) {
        console.error('Token de autenticación no encontrado. No se puede realizar la solicitud.');
        return;
      }
  
      const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/user/favorite?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        console.error('Error al eliminar de favoritos:', response.status, response.statusText);
      } else {
        showSnackbar(`Producto ${productName} eliminado de favoritos`, 'error');
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error.message);
    }
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };


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
      } catch (error) {
        console.error('Error fetching characteristics', error);
      }
    }
  
    fetchCharacteristics();
  }, []);


  const searchProducts = async (searchQuery, categoryName) => {
    try {
      const response = await fetch(
        `http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/search?page=0&product=${searchQuery}&categoryName=${categoryName}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data);
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
  
      const suggestions = Array.isArray(data)
        ? data.map((product) => ({
            label: product.name,
            value: product.productId, 
          }))
        : [];
  
      return suggestions;
    } catch (error) {
      console.error('Error fetching product suggestions', error);
      throw error;
    }
  };
  

  return (
    <ProductContext.Provider value={{snackbarMessage, showSnackbar, dataUser, initializeUserData, products, setProducts, lastUpdate, getProductById, updateProduct, handleDelete, characteristics, setCharacteristics, searchProducts, favorites, setFavorites, addToFavorites, removeFromFavorites, isFavorite, fetchProductSuggestions,  currentPage, setCurrentPage, changePage,}}>
      {children}
    </ProductContext.Provider>
  );
}