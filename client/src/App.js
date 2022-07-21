import 'antd/dist/antd.css'
import { Button } from 'antd';
import {Route,Link,Navigate,Routes} from 'react-router-dom'

import Homepage from './pages/Homepage';
import Items from './pages/Items';
import CartPage from './pages/CartPage'
import Register from './pages/Register';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Bills from './pages/Bills';
function App(props) {

  return (
    <div className="App">
    <Routes>
        <Route path="/home" element= {<ProtectedRoute><Homepage/></ProtectedRoute>} />
        <Route path="/items" element={<ProtectedRoute><Items/></ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>} />
        <Route path="/bills" element={<ProtectedRoute><Bills/></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Customers/></ProtectedRoute>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Login/>}/>
    </Routes>
    </div>
  );
}


export default App;

export function ProtectedRoute(props){
  if(localStorage.getItem('pos-user')){
    return props.children
  }else{
    return <Navigate to = '/login'/>
  }
}


