import React, { useEffect, useState } from 'react';
import Asteroid, { AsteroidProps } from './Asteroid';
import { getAsteroids } from './nasaApi';


export interface AsteroidListProps {
   distanceUnit: 'km' | 'lunarOrbits';
   onAddToCart: (asteroidName: string) => void;
   selectedAsteroids: string[];
}

const AsteroidList: React.FC<AsteroidListProps> = ({ distanceUnit, onAddToCart, selectedAsteroids }) => {
   const [asteroids, setAsteroids] = useState<AsteroidProps[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [pageNumber, setPageNumber] = useState<number>(1);
   const currentDate = new Date();
   const endDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

   const loadAsteroids = async (page: number) => {
      try {
         setLoading(true);
         const data = await getAsteroids(page, endDate);
         setAsteroids((prevAsteroids) => [...prevAsteroids, ...data]);
         setPageNumber(page);
         setLoading(false);
      } catch (error) {
         console.error('Error fetching asteroids:', error);
         setLoading(false);
      }
   };

   useEffect(() => {
      loadAsteroids(pageNumber);
   }, [pageNumber]);

   return (
      <div>
         
         {loading && <p>Загрузка...</p>}

         <ul>
            {asteroids.map((asteroid, index) => (
               <Asteroid
                  key={index}
                  {...asteroid}
                  distanceUnit={distanceUnit}
                  onAddToCart={() => onAddToCart(asteroid.name)}
                  isAddedToCart={selectedAsteroids.includes(asteroid.name)}
               />
            ))}
         </ul>

      </div>
   );
};

export default AsteroidList;
