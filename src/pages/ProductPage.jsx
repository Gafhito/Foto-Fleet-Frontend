import { useParams } from 'react-router-dom';
import { ProductDetails } from '../components/productDetails/ProductDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useProductContext } from "../utils/ProductContext";


const theme = createTheme();

export const ProductPage = () => {
  const { productId } = useParams(); // Obtén el ID del producto de los parámetros de la URL
  const products = useProductContext(); // Accede a la lista de productos desde el contexto

  console.log('Productos del productPage: ', products)
  console.log('productId del productPage: ' + productId)

  // Contexto de productos
  const { getProductById } = useContext(ProductContext);

  // useEffect para obtener detalles del producto al cargar el componente
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await getProductById(productId);
        console.log('Detalles del producto:', details);
        // Haz algo con los detalles del producto si es necesario
      } catch (error) {
        console.error('Error al obtener detalles del producto', error);
      }
    };

    fetchProductDetails();
  }, [getProductById, productId]);

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{minHeight:'100vh'}}>
        <ProductDetails product={product} />
      </div>
    </ThemeProvider>
  );
}