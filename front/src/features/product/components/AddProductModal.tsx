import {FormEvent, useState} from 'react';
import {useCreateProductMutation} from "../productService";

export function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    stock: '',
    rating: '',
  });
  const [addProduct] = useCreateProductMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // addProduct(product);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="bg-pastel-green text-black hover:bg-soft-blue px-4 py-2 rounded-full transition duration-300">
        Add New Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-dark-purple p-6 rounded-lg w-96">
            <h2 className="text-2xl text-white mb-4">Create New Product</h2>
            <form onSubmit={handleSubmit}>
              {/* Form inputs for product */}
              <input type="text" name="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
              <input type="text" name="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
              {/* More form fields here... */}
              <button type="submit" className="bg-pastel-green text-black hover:bg-soft-blue px-4 py-2 rounded-full transition duration-300 mt-4">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
