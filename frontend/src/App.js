import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/AppRouter';
import NavBar from "./components/NavBar";
import TimeZone from "./components/TimeZone";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./http/userApi";
import './styles/Loader.css'

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      if (data){
        user.setUser(data);
        user.setAuth(true);
      }
    }).finally(() => setLoading(false));
  }, []);

  if (loading){
    return <div className="container">
            <div className="loader"></div>
          </div>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <TimeZone />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
