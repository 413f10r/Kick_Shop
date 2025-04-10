// import React, { useState, useEffect } from 'react';
// import '../css/BannerScroll.css';  // Per gli stili

// const BannerScroll = () => {
//   const [scroll, setScroll] = useState(0);

//   useEffect(() => {
//     const scrollInterval = setInterval(() => {
//       setScroll(prevScroll => prevScroll + 1);
//     }, 30); // Velocità dello scroll

//     return () => clearInterval(scrollInterval);
//   }, []);

//   return (
//     <div className="banner-container">
//       <div className="banner-content" style={{ transform: `translateX(-${scroll}px)` }}>
//         <p className='text'>🚚 Spedizione gratuita su tutti gli ordini!</p>
//       </div>
//     </div>
//   );
// };

// export default BannerScroll;
