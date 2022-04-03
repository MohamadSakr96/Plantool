import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/main';
import { Login } from './pages/login';
import { Planning } from './pages/planning';
import { Profile } from './pages/profile';
import { Projects } from './pages/projects';
import { Register } from './pages/register';
import { Stats } from './pages/stats';
import { Team } from './pages/team';
import { AdminRoutes } from './routes/AdminRoutes';
import { PublicRoutes } from './routes/PublicRoutes';
import { getFCMToken } from './firebaseinit';

function App() {

  useEffect(()=>{
    console.log(getFCMToken());
  },[]);

  return (
    <Routes>
      <Route path='/' element= { <PublicRoutes /> }>
        <Route path='register' element={ <Register /> } />
        <Route path='login' element={ <Login /> } />
      </Route>
      <Route path='/' element={ <Layout /> }>
        <Route index element={ <Planning /> } />
        <Route path='/' element={ <AdminRoutes/> }>
          <Route path='team' element={ <Team /> } />
          <Route path='projects' element={ <Projects /> } />
          <Route path='stats' element={ <Stats /> } />
        </Route>
        <Route path='profile' element={ <Profile /> } />
      </Route>
    </Routes>
  );
}

export default App;
