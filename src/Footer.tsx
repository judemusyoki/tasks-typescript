import React from 'react';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright {year} Jude Musyoki</p>
    </footer>
  );
};
