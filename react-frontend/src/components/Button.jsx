import React from 'react';

const Button = ({ variant = 'full', children, ...otherProps }) => {
  const buttonClasses = {
    full: 'bg-neutral-700 hover:bg-neutral-600 rounded-lg py-2 px-4 border-b-4 border-neutral-800',
    light: 'font-semibold px-3 backdrop:blur-md hover:backdrop:blur-lg py-2 hover:transparent text-black hover:bg-slate-100 ease-in-out rounded-md transition-all cursor-pointer',
  };

  return (
    <button className={buttonClasses[variant]} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
