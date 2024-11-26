import { baseApi } from '../../app/api/baseApi';
import { ProductType } from './utils/ProductType';

const productService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductType[], void>({
      query: () => '/products/',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'PRODUCT' as const, id }))
          ]
          : [],
    }),
    getProduct: build.query<ProductType, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'PRODUCT', id }],
    }),
    createProduct: build.mutation<ProductType, Partial<ProductType>>({
      query: (body) => ({
        url: '/products/create/',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: build.mutation<ProductType, ProductType>({
      query: (updatedProduct) => ({
        url: `/products/${updatedProduct.id}/update/`,
        method: 'PATCH',
        body: updatedProduct,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'PRODUCT', id }],
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'PRODUCT', id }],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productService;