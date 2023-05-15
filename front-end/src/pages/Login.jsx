import {  useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap'
import contextGeneric from '../providers/GenericContext';
import api from '../api/axios.config';

function Login() {

	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { setUsername } = useContext(contextGeneric)

	const handleClick = async () => {
		setLoading(true);
		console.log('aqui');
		const { data: { message } } = await api.post('/user', { 
			username: text
		})
		if (message === 'OK') {
			setUsername(text);
			toast.success('Logado!');
			return history.push('/select');
		}
		setText('');
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

export default Login;
