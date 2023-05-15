import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import contextGeneric from '../providers/GenericContext';

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import api from '../api/axios.config';

function Select() {
	
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchParam, setSearchParam] = useState('');

	const { username, socket } = useContext(contextGeneric);
	const history = useHistory();
	// console.log(options);

	useEffect(() => {
		async function init() {
			if (searchParam.length >= 1) {
				setLoading(true);
				const { data } = await api.get('user', {
					params: {
						search: searchParam,
						username,
					}
				});
				if (data.length === 0) {
					setOptions([{ username: 'Nenhum usuário online encontrado' }]);
					setLoading(false);
				} else {
					setOptions(data);
					setLoading(false);
				}
			}
		}
		init();
	}, [searchParam])

	useEffect(() => {
		function init() {
			if (username === '') return history.push('/')
			socket.emit('connected', username)
		}
		init()
	}, [])

	const handleClick = async (_e, newValue) => {
		const verific = [username, newValue.username].sort();
		const join = `${verific[0]}x${verific[1]}`;
		socket.emit('joinRoom', join, newValue.username);
	}

	return (
		<>
			<h1>Ecolha o contato</h1>
			<Autocomplete
				options={options}
				loading={loading}
				style={{ width: 300 }}
				clearOnBlur
				autoHighlight
				freeSolo
				clearOnEscape
				getOptionLabel={(option) => {
					if (option.username === 'Nenhum usuário online encontrado') {
						return option.username;
					}
					return `${option.username} - Online`;
				} }
				// renderOption={renderOption}
				// filterOptions={createAddContactOption}
				onChange={ handleClick }
				renderInput={params => (
					<TextField
						{...params}
						label='Procurar usuário'
						variant="outlined"
						autoFocus
						onChange={e => setSearchParam(e.target.value) }
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress color="inherit" size={20} />
									) : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
			/>
		</>
	)
}

export default Select;
