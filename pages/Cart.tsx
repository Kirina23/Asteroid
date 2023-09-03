import React, { FC } from 'react';
import Link from 'next/link';

interface CartProps {
   selectedAsteroids: string[];
   onToggleCart: () => void;
   isCartOpen: boolean;
}

const Cart: FC<CartProps> = ({ selectedAsteroids, onToggleCart, isCartOpen }) => {

   return (
      <div className={`cart ${isCartOpen ? 'open' : ''}`}>
         <ul>
            {selectedAsteroids.map((asteroid, index) => (
               <li key={index} className="asteroid-list">
                  
                  <Link className="name" href={`/asteroid/${asteroid}`}>
                     {asteroid}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Cart;
