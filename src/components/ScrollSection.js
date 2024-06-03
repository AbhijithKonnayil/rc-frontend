import React, { useState } from 'react';
import TextField from './textfield';

const ScrollSection = ({ title, list, selectedItem, handleCheckboxChange, displayTextFun }) => {
    const [searchKeyword, onSearchChange] = useState('')
    const filteredList = list.filter((e) => {
        console.log(list.includes(e))
        return displayTextFun(e).toLowerCase().includes(searchKeyword.toLowerCase())
    });
    return (
        <div className="basis-2/5 p-2 m-4 border-0 rounded shadow-sm">
            <div className="block ">{list.length === 0 ? `No ${title}` : `${title}`}</div>
            <div className="flex my-4">
                <TextField
                    value={searchKeyword}
                    placeholder={`Search ${title}`}
                    onChange={(e) => {
                        onSearchChange(e.target.value)
                    }}
                    className="flex-1"
                />
                <button className="p-2 ml-2 bg-gray-900 text-white rounded" onClick={() => onSearchChange('')}>
                    Clear
                </button>
            </div>


            <ul className="">
                {filteredList.length == 0 ? <li className="text-center text-gray-500">No {title}</li> : <></>}
                {filteredList.map((c, index) => (
                    <li key={index} className={`flex ${selectedItem[c.id] ? 'bg-orange-400' : 'bg-orange-100'} items-center my-2 p-5 rounded-md`}>
                        <input
                            type="checkbox"
                            className="mr-2 transform scale-150 accent-orange-600"
                            checked={selectedItem[c.id]}
                            onChange={() => handleCheckboxChange(c.id)}
                        />
                        {displayTextFun(c)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScrollSection