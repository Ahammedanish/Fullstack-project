function ProductCard({ product }) {
    return (
      <div className="card">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <p className="price">₹{product.price} / day</p>
        <button>Contact Owner</button>
      </div>
    );
  }
  
  export default ProductCard;
  