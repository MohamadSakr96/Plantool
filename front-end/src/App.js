import React, {useState, useEffect} from 'react';
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
import { onMessageListener } from './firebaseinit';
import { set } from './features/admin/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { GET_PENDING_REQUESTS_URL } from './constants';


function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification]=useState({title:"",body:""});
  const user = useSelector((state) => state.auth.value);

  const dispatch = useDispatch();

  onMessageListener()
    .then((payload) => {
        setShow(true);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
        console.log("Received foreground message",payload);
    })
  .catch((err) => console.log("failed: ", err));

  useEffect(async () => {
    if(show) {
      try {
        const res = await axios.get(GET_PENDING_REQUESTS_URL, {
          headers: {
            "x-access-token": user.accessToken
          }
        });
        dispatch(set(res.data));
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [notification]);
  
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
