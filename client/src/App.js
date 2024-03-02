import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form';

const basePath = process.env.PUBLIC_URL ?? '/';

function App() {
  return (
    <BrowserRouter basename={basePath}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
