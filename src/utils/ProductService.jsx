export const createProduct = async (newProduct, token) => {
    const requestBody = {
      name: newProduct.name,
      description: newProduct.description,
      categoryId: newProduct.categoryId,
      rentalPrice: newProduct.rentalPrice,
      stock: newProduct.stock,
      status: newProduct.status,
      images: [
        {
          url: newProduct.imageUrl,
          primary: true,
        }
      ]
    };


    console.log('requestBody desde el ProductService: ', requestBody)
  
    const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
  
    if (response.status === 201) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error al crear el producto: ${response.status} - ${response.statusText}`);
    }
  };