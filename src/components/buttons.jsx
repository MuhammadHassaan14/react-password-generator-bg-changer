import React from "react"

function Buttons({color, setColor, colorname = color}){
    return(
            <button onClick={() => setColor(color)} className='outline-none px-4 py-1 rounded-full text-white shadow-sm' style={{backgroundColor: color}}>
              {colorname}
            </button>
    )
}

export default Buttons