import {  useState } from 'react'
import './App.css'
import io from 'socket.io-client';

const socket = io('http://localhost:3000/chat');

function App() {

	const [text, setText] = useState('');
	const [message, setMessage] = useState([])
	const [logado, setLogado] = useState(false);
	const [socketId, setSocketId] = useState('');

	socket.on('chat', (text) => {
		console.log(text);
		setMessage([...message, text]);
	})

	socket.on("connect_error", (err) => {
		// console.log(err instanceof Error); // true
		console.log(err.message); // not authorized
		// console.log(err.data); // { content: "Please retry later" }
	});
	
	socket.on('connected', (socketId) => {
		console.log(socketId);
		setSocketId(socketId);
	})

	const handleClick = () => {
		socket.emit('connected', text);
		setLogado(true);
		setText('');
	}

	const handleClick2 = () => {
		socket.emit('send', text, socketId)
		setText('');
	}

	const handleChange = ({ target: { value } }) => {
		setText(value);
	}

  return (
    <>
			<h1>teste</h1>
			{!logado && (
				<>
					<input 
					type="text" 
					value={ text } 
					onChange={ handleChange }
					placeholder='seu nome'
					/>
					<button onClick={ handleClick }>enviar</button>
				</>
			)}
			{logado && (
				<>
					<input type="text"		
					value={ text }
					onChange={ handleChange }
					placeholder='enviar mensagem'
					/>
					<ul>
						{message.map((e) => (
							<li key={e}>{e}</li>
						))}
					</ul>
					<button onClick={ handleClick2 }>enviar</button>
				</>
			)}
    </>
  )
}

export default App;
