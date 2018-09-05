/**
 * socket.io-client
 */

import io from 'socket.io-client';

let host = UPEX.config.websocketHost;

let socket = io(host, {
    transports: ['websocket']
})	

socket.on('connect_failed', (data) => {
	// console.log('connect_failed', data);
});


socket.on('connect', () => {

});

socket.on('disconnect', function(res) {
	// console.log('与服务器断开链接, 重新连接', res);
});

const webchat = {
	socket,

	fetch() {

	},


	off() {

	}
}

export { socket }
export default webchat;