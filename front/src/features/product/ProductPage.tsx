import { ChangeEvent, useState } from 'react';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation
} from './productService';
import { ProductType } from './utils/ProductType';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-dark-bg rounded-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="text-white text-xl absolute top-4 right-4"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export function ProductPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);

  const [newProduct, setNewProduct] = useState<ProductType>({
    id: 0,
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    stock: 0,
    ratings: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    setNewProduct({
      ...newProduct,
      [field]: e.target.value,
    });
  };

  const handleCreateProduct = async () => {
    try {
      createProduct(newProduct);
      setIsModalOpen(false);
      setNewProduct({ id: 0, name: '', brand: '', category: '', description: '', price: '', stock: 0, ratings: '' });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleEditToggle = (id: number, product: ProductType) => {
    setEditingProduct(editingProduct === id ? null : id);
    setEditedProduct(product);
  };

  const handleSave = async (id: number) => {
    if (editedProduct) {
      updateProduct(editedProduct);
      setEditingProduct(null);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditedProduct(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [field]: e.target.value,
      });
    }
  };

  if (isLoading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="text-white text-center">Error loading products.</p>;
  }

  return (
    <div className="bg-dark-bg min-h-screen text-light-gray py-10">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-futuristic text-pastel-green text-center mb-8">
          Product List
        </h1>

        <div className="text-center mb-6">
          <button
            onClick={toggleModal}
            className="bg-pastel-green text-black hover:bg-soft-blue px-4 py-2 rounded-full transition duration-300"
          >
            Add New Product
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <h2 className="text-2xl text-pastel-green mb-4">Create New Product</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => handleInputChange(e, 'name')}
              className="w-full p-2 rounded-md bg-dark-purple text-white border-b border-soft-blue focus:outline-none"
            />
            <input
              type="text"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) => handleInputChange(e, 'brand')}
              className="w-full p-2 rounded-md bg-dark-purple text-white border-b border-soft-blue focus:outline-none"
            />

            {/* Category Field as Select */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm text-soft-blue mb-1">Category</label>
              <select
                id="category"
                value={newProduct.category}
                onChange={(e) => handleInputChange(e, 'category')}
                className="w-full p-2 rounded-md bg-dark-purple text-white border-b border-soft-blue focus:outline-none"
              >
                <option value="Electronics">Electronics</option>
                <option value="Laptops">Laptops</option>
                <option value="Arts">Arts</option>
                <option value="Food">Food</option>
                <option value="Home">Home</option>
                <option value="Kitchen">Kitchen</option>
              </select>
            </div>

            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => handleInputChange(e, 'description')}
              className="w-full p-2 rounded-md bg-dark-purple text-white border-b border-soft-blue focus:outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => handleInputChange(e, 'price')}
              className="w-full p-2 rounded-md bg-dark-purple text-white border-b border-soft-blue focus:outline-none"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => handleInputChange(e, 'stock')}
              className="w-full p-2 rounded-md bg-dark-purple text-white border-b border-soft-blue focus:outline-none"
            />
            <input
              type="number"
              placeholder="Rating"
              value={newProduct.ratings}
              onChange={(e) => handleInputChange(e, 'ratings')}
              className="w-full p-2 rounded-md bg-dark-purple text-white border-b border-soft-blue focus:outline-none"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={toggleModal}
              className="bg-soft-blue text-white px-4 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProduct}
              className="bg-pastel-green text-black px-4 py-2 rounded-full"
            >
              Create
            </button>
          </div>
        </Modal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto" style={{ maxHeight: '70vh' }}>
          {products?.map((product: ProductType) => (
            <div key={product.id}
                 className="bg-dark-purple text-white rounded-lg shadow-soft-neon hover:shadow-lg transition duration-300 ease-in-out p-6">
              <h2 className="text-2xl font-bold text-pastel-green mb-2">
                {editingProduct === product.id ? (
                  <input
                    type="text"
                    value={editedProduct?.name || ''}
                    onChange={(e) => handleChange(e, 'name')}
                    className="bg-dark-bg text-white border-b border-soft-blue focus:outline-none w-full p-2 mb-2 rounded-md transition duration-300"
                    placeholder="Product Name"
                  />
                ) : (
                  product.name
                )}
              </h2>

              <div className="mb-4">
                <label htmlFor="brand" className="block text-sm text-soft-blue mb-1">Brand</label>
                {editingProduct === product.id ? (
                  <input
                    type="text"
                    id="brand"
                    value={editedProduct?.brand || ''}
                    onChange={(e) => handleChange(e, 'brand')}
                    className="bg-dark-bg text-white border-b border-soft-blue focus:outline-none w-full p-2 rounded-md transition duration-300"
                    placeholder="Brand"
                  />
                ) : (
                  <p>{product.brand}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm text-soft-blue mb-1">Category</label>
                {editingProduct === product.id ? (
                  <select
                    id="category"
                    value={editedProduct?.category || ''}
                    onChange={(e) => handleChange(e, 'category')}
                    className="bg-dark-bg text-white border-b border-soft-blue focus:outline-none w-full p-2 rounded-md transition duration-300"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Arts">Arts</option>
                    <option value="Food">Food</option>
                    <option value="Home">Home</option>
                    <option value="Kitchen">Kitchen</option>
                  </select>
                ) : (
                  <p>{product.category}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm text-soft-blue mb-1">Description</label>
                {editingProduct === product.id ? (
                  <textarea
                    id="description"
                    value={editedProduct?.description || ''}
                    onChange={(e) => handleChange(e, 'description')}
                    className="bg-dark-bg text-white border-b border-soft-blue focus:outline-none w-full p-2 rounded-md transition duration-300"
                    placeholder="Description"
                  />
                ) : (
                  <p>{product.description}</p>
                )}
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <label htmlFor="price" className="block text-sm text-soft-blue mb-1">Price</label>
                  {editingProduct === product.id ? (
                    <input
                      id="price"
                      type="number"
                      value={editedProduct?.price || ''}
                      onChange={(e) => handleChange(e, 'price')}
                      className="bg-dark-bg text-white border-b border-soft-blue focus:outline-none w-full p-2 rounded-md transition duration-300"
                      placeholder="Price"
                    />
                  ) : (
                    <p>${product.price}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm text-soft-blue mb-1">Rating</label>
                  {editingProduct === product.id ? (
                    <input
                      id="rating"
                      type="number"
                      value={editedProduct?.ratings || ''}
                      onChange={(e) => handleChange(e, 'rating')}
                      className="bg-dark-bg text-white border-b border-soft-blue focus:outline-none w-full p-2 rounded-md transition duration-300"
                      placeholder="Rating"
                    />
                  ) : (
                    <p>{product.ratings} / 5</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <label htmlFor="stock" className="block text-sm text-soft-blue mb-1">Stock</label>
                  {editingProduct === product.id ? (
                    <input
                      id="stock"
                      type="number"
                      value={editedProduct?.stock || ''}
                      onChange={(e) => handleChange(e, 'stock')}
                      className="bg-dark-bg text-white border-b border-soft-blue focus:outline-none w-full p-2 rounded-md transition duration-300"
                      placeholder="Stock"
                    />
                  ) : (
                    <p>{product.stock}</p>
                  )}
                </div>
              </div>

              {/* Actions (Edit & Delete) */}
              <div className="flex justify-between items-center">
                {editingProduct === product.id ? (
                  <div>
                    <button
                      onClick={() => handleSave(product.id)}
                      className="bg-pastel-green text-black px-4 py-2 rounded-full mr-4 transition duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-soft-blue text-white px-4 py-2 rounded-full transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditToggle(product.id, product)}
                    className="text-soft-blue hover:text-pastel-green"
                  >
                    <FaEdit size={20}/>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(product.id.toString())}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={20}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
