import React from 'react'

const Card = () => {
  return (
    <div>
       <div>
        
<div className="card mt-4 mx-3 my-3" style={{"width": "18rem","maxHeight":"360px"}}>
 <img
  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  className="card-img-top"
  alt="Burger"
/>

  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">this is a card  </p>
<div className='container w-100'>
    <select className='m-2 h-100  bg-success'> 
        {
           Array.from(Array(6),(e,i)=>{
            return(
                <option key={i+1} value={i+1}>{i+1}</option>
            )
           })
        } 
 </select>
 
 <select className='m-2 h-100  bg-success'>
                 <option value="half">Half</option>
                 <option value="full">Full</option>
        
 </select>
<div className='d-inline h-100 fs-5'>
Your Total : 
 </div>

</div>
  </div>
</div>
    </div>
    </div>
  )
}

export default Card
