import React from 'react'

const ScrollBodyInNavWrapper = ({ child }) => {
    return (
        <div className="flex flex-col flex-1  overflow-y-scroll scrollbar scrollbar-thumb-red-900 scrollbar-track-gray-100">
            {child}
        </div>
    )
}

export default ScrollBodyInNavWrapper