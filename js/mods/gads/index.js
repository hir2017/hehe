// 数据统计
// 国内 talkingdata 国外 google统计

/**
<!-- Global site tag (gtag.js) -
Google Ads: 784233641 --> <script async src="https://www.googletagmanager.com/gtag/js?id=AW-784233641"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date()); gtag('config', 'AW-784233641');
</script>
 */


let GAdsCode = UPEX.config.GAdsCodeData;

(function(i, s, o, g, r, a, m) {
    a = s.createElement(o)), (m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date()); gtag('config', 'AW-784233641');
    };
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', `https://www.googletagmanager.com/gtag/js?id=${GAdsCode}`, 'dataLayer');


