import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="w-full flex justify-center">
            <div className="flex items-center bg-gray-100 p-2 rounded-md max-w-md w-full">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-grow p-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
                />
                <button className="bg-blue-600 text-white p-2 ml-2 rounded-md hover:bg-blue-700">
                    <FaSearch />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
