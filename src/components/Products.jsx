import { getProducts } from "../api-adapter";
import React, {useState, useEffect} from "react";

const Products = () =>   {


    return(
<div>
    <h1>hello testing</h1>
    <button onClick={() =>  getProducts()}>test get all products check console</button>
</div>
    )
}

export default Products;