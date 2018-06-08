/**
 * 充币
 */
import React, {Component} from 'react';
import qrcode from "../../lib/qrcode";

class QrcodeView extends Component{
	componentDidMount() {
		this.insertQrcode();
	}

	insertQrcode(code) {
		let el = $(this.refs.qrcode);

		el.qrcode({
			text: this.props.qrcode || '',
			width: 194,
			height: 194,
			render: "canvas"
		});
	}

	render() {
		return <div className="qrcode" ref="qrcode"></div>
	}
}

export default QrcodeView;