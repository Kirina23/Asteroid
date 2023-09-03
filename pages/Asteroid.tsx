import React, { useState } from 'react';
import Link from 'next/link';

export function calculateLunarOrbits(kilometers: number): number {
   return kilometers / 238855;
}

export interface AsteroidProps {
   name: string;
   size: number;
   isPotentiallyHazardous: boolean;
   closeApproachDate: string;
   distanceToEarthKilometers: number;
   distanceToEarthMiles: number;
   distanceUnit: 'km' | 'lunarOrbits';
   onAddToCart: (asteroidName: string) => void;
   isAddedToCart: boolean;
}

function formatDate(dateString: string): string {
   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
   return new Date(dateString).toLocaleDateString(undefined, options);
}

const Asteroid: React.FC<AsteroidProps> = ({
   name,
   size,
   isPotentiallyHazardous,
   closeApproachDate,
   distanceToEarthKilometers,
   distanceToEarthMiles,
   distanceUnit,
   onAddToCart,
   isAddedToCart,
}) => {
   const formattedDate = formatDate(closeApproachDate);
   const lunarOrbitsMiles = distanceToEarthMiles / 238855;
   const smallAsteroidSizeThreshold = 0.1;
   const smallAsteroidImage = '../img/asteroid_small.png';
   const largeAsteroidImage = '../img/asteroid.png';
   const isSmallAsteroid = size <= smallAsteroidSizeThreshold;
   const asteroidImage = isSmallAsteroid ? smallAsteroidImage : largeAsteroidImage;

   const addToCart = () => {
      onAddToCart(name);
   };

   return (
      <div className="asteroid">
         <div className="styledate">{formattedDate}</div>
         <div className="info">
            <div className="distance">
               {distanceUnit === 'km'
                  ? `${distanceToEarthKilometers.toFixed(2)} км`
                  : `${calculateLunarOrbits(distanceToEarthKilometers).toFixed(2)} лунных орбит`}
            </div>
            <img src={asteroidImage} alt={`Изображение астероида ${name}`} />
            <div>
               <Link href={`/asteroid/${name}`} className="name">
                  {name}
               </Link>
               <div className="size">{size.toFixed(2)} м</div>
            </div>
      

      
            {isAddedToCart ? (
               <div className="added-to-cart">Астероид в корзине</div>
            ) : (
               <button onClick={addToCart} className="btn">
                  Заказать
               </button>
            )}
            <div> </div>
            <div className={` ${isPotentiallyHazardous ? 'danger' : 'nototherClass'}`}>
               {isPotentiallyHazardous ? 'Опасен' : 'Не опасен'}
            </div>
         
         </div>

      </div>
   );
};

export default Asteroid;
