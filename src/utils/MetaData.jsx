import { Helmet } from 'react-helmet-async';

export const MetaData = ({ product }) => {


    console.log('PRODUCT DEL MD: ', product)
  return (
    <Helmet>
      <title>{'Foto Fleet'}</title>

      {product && (
        <>
          <meta property="og:url" content={`http://1023c07-grupo3.s3-website-us-east-1.amazonaws.com/products/${product.productId}`} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={product.description?.substring(0, 100)} />
          <meta property="og:image" content={product.images?.[0]?.url || ''} />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={product.name} />
          <meta name="twitter:description" content={product.description} />
          <meta name="twitter:image" content={product.images?.[0]?.url || ''} />
          <meta name='twitter:image:alt' content='ALT DE IMAGEN'/>
        </>
      )}
    </Helmet>
  );
};

