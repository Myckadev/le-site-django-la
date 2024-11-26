import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HomePage} from "./app/components/HomePage";
import {StandardPage} from "./app/components/StandardPage";
import {ProductPage} from "./features/product/ProductPage";

export default  function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<StandardPage />}>
          <Route path="" element={<HomePage />}/>
          <Route path="/products" element={<ProductPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
