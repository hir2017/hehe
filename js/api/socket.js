/**
 * socket.io-client
 */

import io from 'socket.io-client';
import { baseCurrencyId,  tradeCurrencyId } from '../config';

let host = UPEX.config.websocketHost;

let socket = io(host, {
    transports: ['websocket']
})

socket.on('connect', () => {

});

socket.on('disconnect', function() {
	console.log('与服务器断开链接, 重新连接');
    socket.open();
});

const webchat = {
	socket,

	fetch() {

	},


	off() {

	}
}

export { socket , baseCurrencyId ,  tradeCurrencyId}
export default webchat;