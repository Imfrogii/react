import React from 'react';
import '../App.css';

function Header() {
  return (
    <header className="header">
    <span className="logo">LOGO</span>
      <ul>
        <li className="logo" default>Сегодня</li>
        <li className="logo">Завтра</li>
        <li className="logo">3 дня</li>
        <li className="logo">Неделя</li>
        <li className="logo">10 дней</li>
      </ul>
        <span className="city">City</span>

    </header>
  );
}

export default Header;
