import { Switch, Route } from 'react-router-dom'
import Login from './pages/Login';
import Select from './pages/Select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
			<ToastContainer autoClose={2000}/>
			<Switch>
				<Route path='/select' render={() => (
					<Select />
				)} />
				<Route path='/' render={ () => (
					<Login />
				) } 
				/>
				<Route path='*' render={() => (
					<Login />
				)} />
			</Switch>
    </>
  )
}

export default App;
