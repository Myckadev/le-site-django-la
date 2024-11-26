import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HomePage} from "./app/components/HomePage";

export default  function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
