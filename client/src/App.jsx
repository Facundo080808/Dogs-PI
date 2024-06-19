import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';
import Post from './views/Post/Post';
import Detail from './views/Detail/Detail';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>} ></Route>
        <Route path='/home'element={<Home/>}></Route>
        <Route path='/home/:id' element={<Detail/>}></Route>
        <Route path='/create' element={<Post/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
