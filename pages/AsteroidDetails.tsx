// components/AsteroidDetails.tsx

import React, { FC } from 'react';

export interface Asteroid {
   name: string;
   size: number;
   distanceToEarthKilometers: number;
   isPotentiallyHazardous: boolean;
}

interface AsteroidDetailsProps {
   id: string;
   asteroids: Asteroid[] | null;
}

const AsteroidDetails: FC<AsteroidDetailsProps> = ({ id, asteroids }) => {
   // Здесь можно отфильтровать и получить данные выбранного астероида на основе id
   const selectedAsteroid = asteroids?.find((asteroid) => asteroid.name === id);

   if (!selectedAsteroid) {
      return <div>Loading...</div>;
   }

   return (
      <div className="details" >
         <h2>Детали астероида:</h2>
         <div className="label">Название: {selectedAsteroid.name}</div>
         <div className="label">Размер: {selectedAsteroid.size} метров</div>
         <div className="label">Расстояние до Земли: {selectedAsteroid.distanceToEarthKilometers} км</div>
         <div className="danger">Потенциально опасный: {selectedAsteroid.isPotentiallyHazardous ? 'Да' : 'Нет'}</div>
      </div>
   );
};

export default AsteroidDetails;
