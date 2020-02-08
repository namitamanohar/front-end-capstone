// teacher tutoring request card 
import React from "react"
// import "./candy.css"

export default ({candy}) => (

  <section className="candy">
    <h3 className="candy__name"> {candy.product.name}</h3>
    <div className="candy__price">Price: {candy.product.price}</div>    

  </section>

)



