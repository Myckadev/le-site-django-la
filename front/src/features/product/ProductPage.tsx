import { useGetProductsQuery } from './productService';

export function ProductPage() {

  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !products) return <p>Error loading products.</p>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}