

export async function getProducts(){
    console.log("testing")
    fetch('http://localhost:3000/api/products', {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then(result => {
          console.log("testing", result);
        //   if (result)   {
            
        //   }
        })
        .catch(console.error);
}