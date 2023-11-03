
import { useEffect, useState } from 'react';

export function useProductList() {
  const [shuffledCameras, setShuffledCameras] = useState([]);

  useEffect(() => {
    const fetchAndShuffleCameras = async () => {
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
        console.log(data);
        // Mezclar aleatoriamente los productos
        const shuffled = shuffleArray(data);
        setShuffledCameras(shuffled);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    };

    fetchAndShuffleCameras();
  }, []);

  // La función para mezclar el array de productos
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  return shuffledCameras;
}