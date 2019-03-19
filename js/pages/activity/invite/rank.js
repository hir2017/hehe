/**
 * 邀请返佣 － top3
 */
import React, {Component} from "react";
import {getInviteTopList} from '../../../api/http';

const MIN_SIZE = 3;

class RankView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            isFetching: 1
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        getInviteTopList().then((data) => {
            if (data.status == 200) {
                this.setState({
                    list: data.attachment,
                    isFetching: 0
                });
            }
        })
    }

    render() {
        let {isFetching, list} = this.state;
        let dataNum = list.length;
        let emptyNum = (dataNum < MIN_SIZE) ? (MIN_SIZE - dataNum) : 0;
        let $nodes = [];
            list.slice(0, MIN_SIZE).forEach((item, index) => {
                $nodes.push((
                    <li key={index} data-rank={index + 1}>
                        <RankItemTop1to3 data={item}/>
                    </li>
                ));
            });
            // 空占位符补全前3
            if (emptyNum > 0) {
                for (let i = 0; i < emptyNum; i++) {
                    $nodes.push((
                        <li key={i + dataNum} data-rank={i + dataNum + 1} className="no-data">
                            {UPEX.lang.template('暂无数据')}
                        </li>
                    ));
                }
            }

        return (
            <div className="invite-rank">
                <ul>
                    {$nodes}
                </ul>
            </div>
        );
    }
}

class RankItemTop1to3 extends Component {
    static defaultProps = {
        data: {}
    }

    constructor(props) {
        super(props);
        this.state = this.copyPropsToState(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.copyPropsToState(props));
    }

    copyPropsToState(props) {
        return {
            data: props.data
        }
    }

    render() {
        let data = this.state.data;
        let _unit = UPEX.config.version === 'infinitex' ? UPEX.config.baseCurrencyEn : data.currencyNameEn;
        return (
            <div>
                <p className="name">{data.userRegAccount}</p>
                <p className="desc" dangerouslySetInnerHTML={{
                    __html: UPEX.lang.template('获得佣金估值{num}{unit}', {
                        num: data.amount,
                        unit: _unit
                    }, 1)
                }}></p>
            </div>
        )
    }
}

export default RankView;
