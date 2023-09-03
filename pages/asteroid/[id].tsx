// asteroid/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AsteroidDetails, { Asteroid } from '..//AsteroidDetails';
import { getAsteroids } from '../nasaApi';
import Link from 'next/link';

const AsteroidPage = () => {
   const router = useRouter();
   const { id } = router.query as { id: string };
   const [asteroids, setAsteroids] = useState<Asteroid[] | null>(null);

   useEffect(() => {
      const fetchAsteroids = async () => {
         try {
            const fetchedAsteroids = await getAsteroids(1, new Date().toISOString().split('T')[0]);
            console.log('Fetched asteroids:', fetchedAsteroids);
            setAsteroids(fetchedAsteroids);
         } catch (error) {
            console.error('Error fetching asteroids:', error);
         }
      };

      fetchAsteroids();
   }, []);

   return (

      <div className="wrapper">
         <Link href="/">
            <h1 className="title"> armagedon 2023 </h1>
         </Link>
         <h3 className="subtitle">
            ООО "команда им. Б.Уиллиса"
            <br />
            Взрываем астероиды с 1998 года
         </h3>
         <div className="container">
            {asteroids ? (
               <AsteroidDetails id={id} asteroids={asteroids} />
            ) : (
               <div>Loading...</div>
            )}

         </div>
      </div>


   );
};

export default AsteroidPage;
