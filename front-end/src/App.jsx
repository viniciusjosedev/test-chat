import {  useState } from 'react'
import './App.css'
import io from 'socket.io-client';

function App() {

	const [text, setText] = useState('');
	const [message, setMessage] = useState([])

	const socket = io('http://localhost:3000/');

	socket.on('typing', () => {
		console.log('test');
	});

	socket.on('get', (text) => {
		setMessage([...message, text])
	});

	const handleChange = ({ target: { value } }) => {
		setText(value);
		socket.emit('typing');
	}

	const handleClick = () => {
		socket.emit('send', text);
		setText('');
	}

  return (
    <>
			<h1>teste</h1>
			<input 
			type="text" 
			value={ text } 
			onChange={ handleChange }
			/>
			<ul>
				{message.map((e) => (
					<li key={e}>{e}</li>
				))}
      </ul>
			<button onClick={ handleClick }>enviar</button>
    </>
  )
}

export default App
