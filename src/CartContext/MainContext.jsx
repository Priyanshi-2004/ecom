import React, { createContext, useEffect, useState } from 'react'
let CartContext = createContext();
export default function MainContext({children}) {
    let oldData = JSON.parse(localStorage.getItem("CART")) ?? []
    let [carts,setcarts]=useState(oldData)
    let [editableQty, setEditableQty] = useState(oldData)
    let cartData = {carts,setcarts,editableQty, setEditableQty}
    

    useEffect(()=>{
        localStorage.setItem('CART',JSON.stringify(carts));
        // localStorage.setEditableQty('CARTQTY',JSON.stringify(editableQty));
    },[carts])

  return (
    <CartContext.Provider value={cartData}>
        {children}
    </CartContext.Provider>
  )
}
export {CartContext};