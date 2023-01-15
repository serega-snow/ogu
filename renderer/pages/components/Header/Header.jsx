import React from 'react';

const Header = () => {
  return (
    <div className='Header'>
      <div className='Header__title-left'>
        <span className='app-name'>ПИС “Бункер”</span>
      </div>
      <div className='Header__title-right'>
        <span className='title-text'>Система размораживания грузов</span>
      </div>
    </div>
  );
};

export default Header;
