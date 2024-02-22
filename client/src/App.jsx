import './App.css';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import UserContextProvider from './context/UserContext';
import CreatePostPage from './pages/CreatePostPage';

const App = () => {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/create'} element={<CreatePostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
