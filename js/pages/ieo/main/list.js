/**
 * @fileoverview IEO 数字币列表
 */
import React, {Component} from 'react';
import CountDown from '../countdown';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: 0,
            list: [
                {
                    symbol: 'GIFTO',
                    numDesc: 'Amount',
                    projectType: 1,
                    purchase: false,
                    purchasedNumber: 12500000,
                    purchasedCount: 1011,
                    projectStatusName: 'Success',
                    feeRate: 0.0,
                    picPath: 'https://ex.bnbstatic.com/file/resources/img/20171212/image_1513078271488.jpg',
                    projectStatus: '45',
                    number: 15000000,
                    projectDetailDesc:
                        '<img src="https://resource.binance.com/file/resources/img/kindeditor/attached/image/20171212/20171212184332_490.jpg" width="1200" height="876" alt="" /><img src="https://resource.binance.com/file/resources/img/kindeditor/attached/image/20171212/20171212184627_75.jpg" width="1200" height="1124" alt="" /><img src="https://resource.binance.com/file/resources/img/kindeditor/attached/image/20171212/20171212184411_971.jpg" width="1200" height="354" alt="" /><img src="https://resource.binance.com/file/resources/img/kindeditor/attached/image/20171212/20171212184422_574.jpg" width="1200" height="856" alt="" /><img src="https://resource.binance.com/file/resources/img/kindeditor/attached/image/20171212/20171212184433_777.jpg" width="1200" height="902" alt="" /><img src="https://glht.bjadm.net/file/resources/img/kindeditor/attached/image/20171214/20171214064224_4.jpg" width="1200" height="1025" alt="" /><img src="https://resource.binance.com/file/resources/img/kindeditor/attached/image/20171212/20171212184453_571.jpg" width="1200" height="771" alt="" /><img src="https://resource.binance.com/file/resources/img/kindeditor/attached/image/20171212/20171212184505_250.jpg" width="1200" height="640" alt="" />',
                    price: 0.035,
                    timeDesc: 'End Time',
                    projectDesc:
                        'GIFTO Protocol, a new blockchain protocol that will integrate seamlessly with any content platform to allow content creators and influencers to generate income with virtual gifts.  Gifto Protocol will be powered by Gifto tokens.',
                    distributeNum: 15000000,
                    time: 1513857600000,
                    asset: 'BNB',
                    projectName: 'GIFTO-BNB Session',
                    projectId: '19',
                    priceDesc: 'Price'
                }
            ],
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({
            isFetching: 1
        });

        // getIEOList().then(res => {
        //     if (res.status == 200) {
        //         this.setState({
        //             list: res.attachment,
        //             isFetching: 0
        //         })
        //     }
        // }).catch(()=>{
        //     console.log('getIEOList err')
        //     this.setState({
        //         isFetching: 0
        //     })
        // })
    }

    render() {
        let $content = null;
        $content = this.state.list.map((item, i) => (
            <li className="token-item" key={i}>
                <a href="">
                    <div className="token-pic">
                        <img src={item.picPath} alt=""/>
                    </div>
                    <div className="token-status"></div>
                    <div className="token-content">
                        <h3 className="name"></h3>
                        <p className="desc"></p>
                        <div className="progress">
                            {
                                item.projectType == 1 ? <CountDown remainTime="100000"/> : <div>已募集。。。</div>
                            }
                        </div>
                        <div className="detail">
                            <div className="amount"></div>
                            <div className="time"></div>
                        </div>
                    </div>
                </a>
            </li>
        ));
        return (
            <div className="token-list-wrapper">
                <ul className="token-list">
                    {$content}
                </ul>
            </div>
        );
    }
}

export default View;


