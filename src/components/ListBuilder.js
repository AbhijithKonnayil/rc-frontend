import React from 'react'

const ListBuilder = ({ dataList, noItemText, itemCard }) => {

    console.log(itemCard)
    if (dataList.length == 0) {
        return <div>{noItemText}</div>
    }
    return <div>
        <ul>
            {dataList.map(itemCard)}
        </ul>

    </div>
}   

export default ListBuilder