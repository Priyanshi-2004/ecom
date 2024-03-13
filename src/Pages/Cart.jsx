import React, { useContext, useEffect, useState } from 'react'
import Header from '../Common/Header'
import { CartContext } from '../CartContext/MainContext'


export default function Cart() {

  let {carts,setCarts}=useContext(CartContext)
   const [totalAmount, setTotalAmount] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  
   useEffect(()=>{
      const total = carts.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotalAmount(total);

      const tax = total * 0.1;
    setTaxAmount(tax);

    // Calculate the final total by adding total amount and tax
    const final = total + tax;
    setFinalTotal(final);

   },[carts]);
  return (
    <div>
        <Header/>
        <div class="container mx-auto px-4 sm:px-8">
  <div class="py-8">
    <div>
      <h2 class="text-2xl font-semibold leading-tight">Cart Items</h2>
    </div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div
        class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
      >
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
            <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Sr No.
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Product Image / Name
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               QTY
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
              >
                  Delete

              </th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cartItems,index)=>{
              return(
                <CartList cartItems={cartItems} index={index}/>
              )
            })}
           
            
           
          </tbody>
        </table>
      </div>


      <div className='flex justify-end m-[20px]'>
        <table>
          <tr>
          <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               Total Amount
              </th>
              <td
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               ${totalAmount.toFixed(2)}
              </td>
          </tr>
          <tr>
          <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               Tax Amount
              </th>
              <td
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
              ${taxAmount.toFixed(2)}
              </td>
          </tr>
          <tr>
          <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               Final Total
              </th>
              <td
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
              ${finalTotal.toFixed(2)}
              </td>
          </tr>
        </table>
      </div>


    </div>
  </div>
</div>
</div>
   
  )
}


function CartList({cartItems,index}){
  let {carts,setcarts}=useContext(CartContext)
   const [editableQty, setEditableQty] = useState(cartItems.qty);

    const updateQty = () => {
    const updatedCarts = [...carts];
    updatedCarts[index].qty = editableQty;
    setcarts(updatedCarts);
  };

  let removeData=()=>{
    // let l=[10,20,30]
    // l.filter((n,m)=>m!=0)  //[20,30]
 

    let filterData=carts.filter((v,i)=> index!==i )
    setcarts(filterData)
  }
  return(
    <tr>
    <td>
      {index+1}
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex">
        <div class="flex-shrink-0 w-10 h-10">
          <img
            class="w-full h-full rounded-full"
            src={cartItems.image}
            alt=""
          />
        </div>
        <div class="ml-3">
          <p class="text-gray-900 whitespace-no-wrap">
            {cartItems.title}
          </p>
          
        </div>
      </div>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">
        $ {cartItems.price}
      </p>
      
    </td>
      <div className="flex items-center">
        
          <input
            value={editableQty}
            type="number"
            className="border border-[red] w-8 text-center mx-2"
            onChange={(e) => setEditableQty(parseInt(e.target.value) || 0)}
          />
         
         
        </div>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      ${cartItems.price*editableQty}
    </td>
    <td
      class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
    >
       <span onClick={removeData}
        class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
      >
        <span
          aria-hidden
          class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
        ></span>
        <span class="relative">Remove Items</span>
      </span>
      
    </td>
  </tr>
  )
}