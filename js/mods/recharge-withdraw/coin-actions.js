import { getCoinAccount, selectUserAddress } from '@/api/http';


function coinChange(val) {
    const [currencyId, currencyNameEn] = val.split('_');
    this.setState({
        currencyId,
        currencyNameEn
    });
    this.fetchCoinAddress(currencyId);
}

export function initStateAndChange(ctx) {
        ctx.state.coinsInfo = {};
        ctx.state.coins = [];
        ctx.state.currencyNameEn = '';
        ctx.state.currencyId = '';
        ctx.state.addressInfo = {};
        ctx.coinChange = coinChange.bind(ctx);
}

export function initCoinList(ctx) {
    let currencyNameEn = ctx.props.params.code || '';
    currencyNameEn = currencyNameEn.toUpperCase();
    if (currencyNameEn) {
        ctx.setState({
            currencyNameEn
        });
    }
    getCoinAccount()
        .then(res => {
            let coins = res.attachment ? res.attachment.coinList : [];
            coins = coins.filter(item => item.currencyNameEn !== UPEX.config.baseCurrencyEn);
            ctx.setState({
                coinsInfo: res,
                coins
            });
        })
        .catch(err => {
            console.error('fetchCoinList getCoinAccount', err);
        }).then(() => {
        const currCoin = ctx.state.coins.filter(item => item.currencyNameEn === currencyNameEn);
        if (currCoin.length !== 0) {
            const { currencyId } = currCoin[0];
            ctx.setState({
                currencyId
            });
            ctx.fetchCoinAddress(currencyId);
        } else {
            console.error('componentDidMount fetchCoinList 暂无选中货币')
        }
    });
}
