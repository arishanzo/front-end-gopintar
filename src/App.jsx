
import { BrowserRouter as Router } from 'react-router-dom';

import Routeer from './router/Router';
import { AuthProvider } from "./context/AuthProvider";



function App() {
  return (
    <div>
      
      <AuthProvider>
      <Router>
      <Routeer/>
      </Router>
      </AuthProvider>

</div>
  )
}

export default App