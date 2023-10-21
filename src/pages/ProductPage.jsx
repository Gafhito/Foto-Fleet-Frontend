import { useParams } from 'react-router-dom';
import { ProductDetails } from '../components/productDetails/ProductDetails';

import { useProductContext } from "../utils/ProductContext";

export const ProductPage = () => {
  const { productId } = useParams(); // Obtén el ID del producto de los parámetros de la URL
  const products = useProductContext(); // Accede a la lista de productos desde el contexto

  // Busca el producto correspondiente en la lista de productos
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <div>
      <ProductDetails product={product} /> {/* Pasa el producto como una prop a ProductDetails */}
    </div>
  );
};