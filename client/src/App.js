import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';

function App() {
  return (
    // Para Github Pages necesitamos HashRouter de lo contrario podemos usar BrowserRouter
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
