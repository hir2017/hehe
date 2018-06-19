/**
 * SVG 绘制简单的24小时K线图
 * @author 陈立英
 */
class ChartData {
    constructor() {
        this.barCount = 23; // 24项小时，23个点
        this.max = 0;
        this.min = 1000 * 1000 * 1000;
    }
    /**
     * @param data [array] 开盘价格数组 [3,4,55]
     * @param width [number] 线图宽
     * @param height [number] 线图高
     * @example { data: [], width: '', height: ''}
     */
    setData(cfg) {
        this.width = cfg.width;
        this.height = cfg.height;
        let data = this.data = cfg.data;
        let len = data.length;

        // 遍历数组，查找最大的值, 最小值
        for (let i = 0; i < len; i++) {
            var closePrice = Number(data[i][1]);

            this.max = Math.max(closePrice, this.max);
            this.min = Math.min(closePrice, this.min);
        }

        if (this.max == this.min) {
            this.min = 0.9 * this.min;
            this.max = 1.1 * this.max;
        }
    }

    getY (num) {
        return this.height * (1 - (num - this.min) / (this.max - this.min));
    }

    getX (num) {
        return this.width * (num / this.barCount);       
    }

    getPath() {
        let arr = [];

        this.data.forEach((item, i) =>{

            let closePrice = Number(item[1]);

            if (i == 0) {
                arr.push("M" + this.getX(i) + " " + this.getY(closePrice || 1));
            } else {
                arr.push("L" + this.getX(i) + " " + this.getY(closePrice || 1));
            }
        });

        return arr.join(" ");
    }

    getFill() {
        let arr = [];
        let n;

        arr.push("M0 " + this.height);

        this.data.forEach((item, i) =>{
            let closePrice = Number(item[1]);
            
            arr.push("L" + this.getX(i) + " " + this.getY(closePrice || 1));
            n = this.getX(i);
        });

        arr.push("L" + (n || 0) + " " + this.height);

        return arr.join(" ");
    }


}

const klineChart =  new ChartData();

export default klineChart;