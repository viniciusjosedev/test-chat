import {  useState } from 'react';
import { useHistory } from 'react-router-dom'
import api from '../api/axios.config';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap'

function App() {

	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleClick = async () => {
		setText('');
		setLoading(true);
		const { status } = await api.post('/user', { 
			username: text
		})
		if (status === 201) {
			toast.success('Logado!');
			return history.push('/select');
		}
		toast.error('Usuário já está em uso, escolha outro!');
		setLoading(false);
	}

	const handleChange = ({ target: { value } }) => {
		setText(value);
	}

  return (
    <>
			{!loading && (
				<>
					<h1>Fala comigo MAN!</h1>
					<input type="text"		
					value={ text }
					onChange={ handleChange }
					placeholder='Username'
					/>
					<button onClick={ handleClick }>Entrar</button>
				</>
			)}
			{loading && (
				<Spinner />
			)}
    </>
  )
}

export default App;
