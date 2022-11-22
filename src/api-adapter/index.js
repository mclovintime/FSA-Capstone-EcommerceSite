

export async function getProducts(){
    try {
    const response = await fetch('http://localhost:3000/api/products')
      const result = await response.json()
      return result
    } catch (error) {
        console.error(error)
    }
    
}