<template>
    <div id="app">
        <div class="box">
            <div
                class="bg"
                v-bind:style="{width:'1920px',height:'1080px',transform: `scale(${scaleSize}) translate(-50%,-50%)`}"
            >
                <div class="title">xxxx</div>
                <div
                    v-for="(item,index) in table"
                    :key="index"
                    v-bind:class="[`num${index+1}`]"
                    v-on:click="getTable(index,item.num)"
                >{{item.num}}</div>
                <div class="clock">
                    <div>{{time}}</div>
                    <div>{{date}}</div>
                </div>
                <div class="table" v-if="show">
                    <img src="./../../assets/close.png" class="close" alt @click="show=false" />
                    <div v-if="!mesText" class="tablebox">
                        <p
                            class="titletbale"
                        >{{num}}/{{ (new Date().toLocaleDateString()).split("/").join("-")}}/{{`所有班次`}}</p>
                        <table>
                            <thead :class="scroll? 'scroll':''">
                                <th>生成日期</th>
                                <th>生产班次</th>
                                <th>工单号</th>
                                <th colspan="3">产品名称</th>
                                <th>计划数量</th>
                                <th>完成数量</th>
                                <th>完成率</th>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in activetable" :key="index">
                                    <td>{{item.scheduledStartDate.substring(0,10)}}</td>
                                    <td>{{item.priority}}</td>
                                    <td>{{item.shopOrder}}</td>
                                    <td colspan="3">{{item.itemDec}}</td>
                                    <td>{{item.qtyPlan}}</td>
                                    <td>{{item.qtyDone}}</td>
                                    <td>{{item.completionRate}}</td>
                                    <!-- <td v-for="(i,index) in item" v-bind:key="index">{{i}}</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p v-else class="mesText">暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</template>  
<script>
import $ from "./../../utils/request.js";
export default {
    name: "app",
    data() {
        return {
            clientHeight: 0,
            clientWidth: 0,
            time: null,
            date: null,
            table: [
                { num: "2403", data: [] },
                { num: "2401", data: [] },
                { num: "2406", data: [] }
            ],
            activetable: [],
            show: false,
            mesText: false,
            num: "",
            scroll: false
        };
    },
    computed: {
        scaleSize: {
            // getter
            get: function() {
                return this.clientWidth / this.clientHeight > 1920 / 1080
                    ? this.clientHeight / 1080
                    : this.clientWidth / 1920;
            },
            // setter
            set: function(newValue) {
                console.log(scaleSize);
            }
        }
    },
    mounted() {
        const that = this;
        that.clientWidth = window.innerWidth;
        that.clientHeight = window.innerHeight;
        window.onresize = () => {
            return (() => {
                that.clientWidth = window.innerWidth;
                that.clientHeight = window.innerHeight;
            })();
        };
        that.getDate();
        that.getTime();
        setInterval(function() {
            that.getTime();
        }, 1000);
    },
    methods: {
        getDate() {
            let date = new Date();
            let num = ["日", "一", "二", "三", "四", "五", "六"];
            this.date = `${date.toLocaleDateString()} 星期${
                num[date.getDay()]
            }`;
        },
        getTime() {
            let date = new Date();
            this.time = `${
                date.getHours() < 10
                    ? `0${date.getHours()}`
                    : `${date.getHours()}`
            }:${
                date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : `${date.getMinutes()}`
            }:${
                date.getSeconds() < 10
                    ? `0${date.getSeconds()}`
                    : `${date.getSeconds()}`
            }`;
        },
        async getTable(index, num) {
            let site = "2101";
            this.num = num;
            let plannedStartDate = new Date()
                .toLocaleDateString()
                .split("/")
                .join("-");
            let res = await $.get(
                `/api/board/workShops?site=${site}&workCenter=${num}&plannedStartDate=${plannedStartDate}`
            );
            if (res.data.length > 0) {
                this.activetable = res.data;
                this.show = true;
                this.mesText = false;
            } else {
                this.mesText = true;
                this.show = true;
            }

            this.scroll = res.data.length > 4;
        }
    }
};
</script>

<style>
body {
    margin: 0;
}
#app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    text-align: center;
}
.box {
    width: 100%;
    height: 100%;
    background-color: #010717;
    color: #fff;
    text-align: center;
}
.bg {
    /* background-image: url("./../../assets/bg.png");
    background-size: 100% 100%; */
    background: #010717;
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform-origin: left top;
    z-index: 999;
}
.title {
    color: #00f5f7;
    font-size: 45px;
    position: absolute;
    left: 645px;
    top: 43px;
}
.clock {
    width: 270px;
    height: 121px;
    position: absolute;
    top: 153px;
    left: 1606px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
}
.clock div:first-child {
    font-size: 45px;
}
.clock div:last-child {
    font-size: 20px;
}
.num1,
.num2,
.num3 {
    position: absolute;
    font-size: 20px;
    transform: rotate(30deg);
    cursor: pointer;
}
.num1 {
    left: 788px;
    top: 159px;
}
.num2 {
    left: 1068px;
    top: 300px;
}
.num3 {
    left: 1190px;
    top: 636px;
}
.titletbale {
    font-size: 24px;
    color: #fff;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, 0);
}
.table {
    /* background: url('./../../assets/box.png') no-repeat;
     */
    background: #000;
    width: 1200px;
    height: 500px;
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.table table {
    background: #0c275f;
    border: 1px solid #ceeae8;
    /* border-left: 1px solid #ceeae8; */
    border-spacing: 0; /*去掉单元格间隙*/
    color: #ceeae8;
    font-size: 18px;
    width: 100%;
    height: 100%;
}
.tablebox {
    width: 95%;
    height: 65%;
}
.table thead {
    box-sizing: border-box;
}
.scroll {
    padding-right: 10px;
}
.table thead th {
    color: #00f5f7;
    border-right: 1px solid #ceeae8;
    line-height: 30px;
    font-size: 18px;
    white-space: nowrap;
    display: table-cell;
    vertical-align: inherit;
}
.table tbody {
    width: 100%;
    height: 90%;
    overflow: auto;
    display: block;
    text-align: center;
}
.table tbody::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    height: 5px;
    background-color: #0d4195;
}
.table tbody::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background-color: #068cfc;
    box-shadow: inset 0 0 2px #000;
}
.table tbody::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 2px rgba (0, 0, 0, 0.3);
    background-color: #0c265a;
}
.table thead,
tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}
.table tr:first-child td {
    border-top: 1px solid #ceeae8;
}
.table td {
    padding: 5px 10px;
    border-bottom: 1px solid #ceeae8;
    border-right: 1px solid #ceeae8;
}

.close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 30px;
    height: 30px;
    cursor: pointer;
}
.mesText {
    font-size: 25px;
}
</style>
