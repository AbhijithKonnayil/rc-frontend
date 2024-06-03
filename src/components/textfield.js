import React from 'react';

const TextField = ({ label, type, name, value, onChange, placeholder, disabled, className }) => {
  return (
    <div className={`${className}`}>
      {label && <label htmlFor={label} className="block text-sm font-medium text-gray-600">{label}</label>}
      <input
        name={name}
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
  );
};

export default TextField;
