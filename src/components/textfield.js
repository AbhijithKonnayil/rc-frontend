import React from 'react';

const TextField = ({ label, type, name, value, onChange, placeholder, disabled, className }) => {
  return (
    <div className={className}>
      {label && <label htmlFor={label} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>}
      <div className={``}>
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
    </div>
  );
};

export default TextField;
