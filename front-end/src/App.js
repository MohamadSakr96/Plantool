import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Planning } from './pages/planning';
import { Profile } from './pages/profile';
import { Projects } from './pages/projects';
import { Register } from './pages/register';
import { Stats } from './pages/stats';
import { Team } from './pages/team';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='register' element={ <Register /> } />
        <Route path='login' element={ <Login /> } />

        <Route path='/' element={ <Planning /> } />
        <Route path='team' element={ <Team /> } />
        <Route path='projects' element={ <Projects /> } />
        <Route path='stats' element={ <Stats /> } />
        <Route path='profile' element={ <Profile /> } />
      </Routes>
    </div>
  );
}

export default App;
