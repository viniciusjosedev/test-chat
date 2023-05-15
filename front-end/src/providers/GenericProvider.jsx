import PropTypes from "prop-types"
import GenericContext from './GenericContext';
import { useMemo, useState } from "react";
import io from 'socket.io-client';
import process from 'process';

const URL = process.env.URL_API || 'http://localhost:3000/chat';
const socket = io(URL)

function ProviderGeneric(props) {
	const [username, setUsername] = useState('');

	const exports = useMemo(() => (
    {
			username,
			setUsername,
			socket
		}
	), [username, setUsername])

	return (
		<GenericContext.Provider value={ exports }>
			{props.children}
		</GenericContext.Provider>
	)
}

ProviderGeneric.propTypes = {
	children: PropTypes.any.isRequired,
}

export default ProviderGeneric;
