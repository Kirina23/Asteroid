import React, { FC, useState } from 'react';
import Link from 'next/link';
import AsteroidList from './AsteroidList';
import Cart from './Cart';
import './index.scss';
import './App.scss';

const App: FC = () => {
   const [distanceUnit, setDistanceUnit] = useState<'km' | 'lunarOrbits'>('km');
   const [selectedAsteroids, setSelectedAsteroids] = useState<string[]>([]);
   const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

   const switchToKilometers = () => {
      setDistanceUnit('km');
   };

   const switchToLunarOrbits = () => {
      setDistanceUnit('lunarOrbits');
   };

   const addToCart = (asteroidName: string) => {
      setSelectedAsteroids((prevSelectedAsteroids) => [...prevSelectedAsteroids, asteroidName]);
   };

   const openCart = () => {
      setIsCartOpen(true);
   };

   const toggleCart = () => {
      setIsCartOpen((prevState) => !prevState);
   };

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
         <div className="items">
            <div className="item">
               <img className="picture" src="img/earth.png" alt="Earth" />
            </div>

            <div className="item">
               <h2> Ближайшие подлеты астероидов </h2>
               <div className="navbar">
                  <span onClick={switchToKilometers} className={distanceUnit === 'km' ? 'active' : ''}>
                     в километрах
                  </span>
                  {' | '}
                  <span onClick={switchToLunarOrbits} className={distanceUnit === 'lunarOrbits' ? 'active' : ''}>
                     в лунных орбитах
                  </span>
               </div>
               <div className="container">
                  <AsteroidList distanceUnit={distanceUnit} onAddToCart={addToCart} selectedAsteroids={selectedAsteroids} />
               </div>
            </div>

            <div className="item">
               <div className="cart-wrapper"> 
               <div className="cart-title"> Корзина ({selectedAsteroids.length})</div>

               <div className="cart" onClick={toggleCart}>
                  <button className="btn-big">
                     {isCartOpen ? 'Закрыть' : 'Отправить'}
                  </button>
               </div>
               {isCartOpen && (
                  <Cart selectedAsteroids={selectedAsteroids} isCartOpen={isCartOpen} onToggleCart={toggleCart} />
               )}
            </div>
            </div>

         </div>
      </div>


   );
};



export default App;
