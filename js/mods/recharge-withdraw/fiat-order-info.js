
import React from 'react';

export default OrderInfoView = ({labels = {}, bank, card, user, count}) => {
    return (
       <div>
            <div className="rw-form-item">
                <label className="rw-form-label">{labels.title}</label>
                <div className="rw-form-info">
                    <div className="bank-card">
                        <div className="bank-card-box">
                            <div className="card-name">{bank}</div>
                            <div className="center-box">
                                <div className="user-name">{user}</div>
                                <div className="card-no">{`${card}`} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rw-form-item recharge-form-balance">
                <label className="rw-form-label">{labels.count}</label>
                <div className="rw-form-info order-amount">
                    <i className="unit">{UPEX.config.baseCurrencySymbol}</i>
                    <em className="balance">{count}</em>
                </div>
            </div>
       </div>
    )
};
