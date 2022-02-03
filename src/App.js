import { Container } from '@material-ui/core';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SimpleBottomNavigation from './components/Nav';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Trending from './pages/Trending';
import Search from './pages/Search';
function App() {
  return (
    <BrowserRouter>
        <Header />
    <div className="app">
     <Container>
       <Routes>
         <Route exact path='/' element={<Trending />} />         
         <Route path='/movies' element={<Movies />} />
         <Route path='/series' element={<Series />} />
         <Route path='/search' element={<Search />} />
       </Routes>
     </Container>
    </div>
    <SimpleBottomNavigation />
    </BrowserRouter>
  
  );
}

export default App;
