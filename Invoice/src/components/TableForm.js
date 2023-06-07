import React from 'react'
import  {useState, useEffect } from 'react'
import  {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"
import {v4 as uuidv4} from "uuid"

export default function TableForm({
    description,
    setDescription,
    quantity,setQuantity,
    price,setPrice,
    amount,setAmount,list,setList,total,setTotal
}) {
  
const[isEditing, setIsEditing] = useState(false)


 const handleSubmit =(e) => {
  e.preventDefault()

  if ( !description || !quantity || !price){
    alert("Please fill in all inputs")

  }else{
    const newItems ={
      id: uuidv4(),
     description,
     quantity,
     price,
     amount,
    }
    setDescription("")
    setQuantity("")
    setPrice("")
    setAmount("")
    setList([...list, newItems])
    setIsEditing(false)
    
  }


}
   useEffect(()=>{
    const calculateAmount = (amount) => {
        setAmount(quantity * price)
       }
    calculateAmount(amount)   
    
   }, [amount,price,quantity,setAmount])
//calculate//

 useEffect (() => {
  
  let rows = document.querySelectorAll(".amount")
  let sum = 0

for(let i=0; i < rows.length; i++){
  if (rows[i].className === "amount"){
    sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML)
    setTotal(sum)
  }
}
})

//Edit function//
const editRow = (id) => {
  const editingRow = list.find((row) => row.id ===id)
  setList(list.filter((row) => row.id !== id))
  setIsEditing(true)
  setDescription(editingRow.description)
  setQuantity(editingRow.quantity)
  setPrice(editingRow.price)
}

//delete function //
const deleteRow = (id) => setList(list.filter((row)=> row.id !== id))

 return (
<>
<form onSubmit={handleSubmit}>
<div className="flex flex-col md:mt-16">
    <label htmlFor="description">Item description</label>
    <input
    type="text"
    name="description"
    id="description"
    placeholder="Item description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}/>
</div>

<div className="md:grid grid-cols-3 gap-10">
<div className="flex flex-col">
 <label htmlFor="quantity">Quantity</label>
  <input
  type="text"
  name="quantity"
  id="quantity"
  placeholder="Quantity"
 value={quantity}
 onChange={(e) => setQuantity(e.target.value)}/>
 </div>
 <div className="flex flex-col">
<label htmlFor="price">Price</label>
<input
 type="text"
 name="price"
 id="price"
placeholder="Price"
value={price}
 onChange={(e) => setPrice(e.target.value)}/>
 </div>
 <div className="flex flex-col">
 <label htmlFor="amount">Amount</label>
  <p>{amount}</p>
</div>
</div>
<button type='submit' className=' md-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shodow border-2 border-blue-500 
hover:bg treansparent hover:text-blue-500'>

{isEditing ?  " Editing Row Item" : "Add table Item" }
</button>
</form>
{/* table items*/}
<table width="100%" className='mb-10'>
<thead>
      <tr className='bg-gray-100 py-1'>
        <td className='font-bold'>Item description</td>
        <td className='font-bold'>Quantity</td>
        <td className='font-bold'>Price</td>
        <td className='font-bold'>Amount</td>
      </tr>
    </thead>
    
  {list.map(({id, description,quantity,price,amount}) =>(
    <React.Fragment key={id}>
<tbody>
<tr>
  <td>{description}</td>
  <td>{quantity}</td>
  <td>{price}</td>
  <td className='amount'>{amount}</td>
  <td>
    <button onClick={() => deleteRow(id)}>
    <AiOutlineDelete className='text-red-500 font-bold-xl'/>
    </button>
    </td>
    <td>
      <button onClick={() => editRow(id)}><AiOutlineEdit className='text-green-500 font-bold text-xl'/></button>
    </td>

</tr>
</tbody>
</React.Fragment>
))}
  </table>
<div>
  <h2 className='flex items-end justify-end text-gray-800 text-4xl font-bold'>Total. {total.toLocaleString()}</h2>
</div>


</>
  )}