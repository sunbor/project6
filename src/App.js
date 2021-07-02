import './App.css';
import { Login, Registration, Reimbursements }   from './components/pages';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {

  const [userCreds, setUserCreds] = useState({
    username: "",
    userId: 0,
    jwt: ""
  });

  return (
    <Routes>
      <Route path="/" element={<Login setUserCreds={setUserCreds} />}></Route>
      <Route path="/login" element={<Login setUserCreds={setUserCreds} />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/reimbursements" element={<Reimbursements userCreds={userCreds} setUserCreds={setUserCreds}/>}></Route>
    </Routes>
  );
}

export default App;
