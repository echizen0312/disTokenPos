<template>
    <div style="width: 100%; height: 100%; display: flex; justify-content: center;">
        <input v-model="scanValue" ref="scanInput" type="password"
               style="position: absolute; top: 0; left: 0; width: 0; height: 0; border: none;"/>
        <input ref="notScanInput" type="password"
               style="position: absolute; top: 0; left: 0; width: 0; height: 0; border: none;"/>
        <el-row :gutter="20" style="width: 100%;">
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" style="margin-bottom: 20px;">
                <el-card class="box-card" style="width:100%; min-width: 299px;">
                    <div slot="header">
                        <span>收款面板</span>
                        <el-switch
                                style="float: right;"
                                v-model="autoRequest"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="自动确认"
                                inactive-text="手动确认">
                        </el-switch>
                    </div>
                    <el-select v-model="form.token" placeholder="请选择收款币种" style="width: 100%; margin-bottom: 10px;">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-row :gutter="10" style="margin-bottom: 10px;">
                        <el-col :span="18" style="padding: 10px 0 10px 12px;">
                            <div style="text-align: left; font-size: 22px; font-weight: bold; width: 100%; color: #F56C6C;">
                                {{ form.number }}
                            </div>
                        </el-col>
                        <el-col :span="6" style="padding: 10px 12px 10px 0;">
                            <div style="text-align: right; font-size: 22px; font-weight: bold; width: 100%; color: #F56C6C;">
                                {{ form.token }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin-bottom: 10px;">
                        <el-col :span="6">
                            <el-button type="info" class="sakButton" @click="NumClick('1')">1
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="info" class="sakButton" @click="NumClick('2')">2
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="info" class="sakButton" @click="NumClick('3')">3
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="warning" class="sakButton" icon="el-icon-back"
                                       @click="NumDelete"></el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin-bottom: 10px;">
                        <el-col :span="6">
                            <el-button type="info" class="sakButton" @click="NumClick('4')">4
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="info" class="sakButton" @click="NumClick('5')">5
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="info" class="sakButton" @click="NumClick('6')">6
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="danger" class="sakButton" icon="el-icon-delete"
                                       @click="NumClear"></el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin-bottom: 10px;">
                        <el-col :span="18">
                            <el-row :gutter="10" style="margin-bottom: 10px;">
                                <el-col :span="8">
                                    <el-button type="info" class="sakButton" @click="NumClick('7')">7
                                    </el-button>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="info" class="sakButton" @click="NumClick('8')">8
                                    </el-button>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="info" class="sakButton" @click="NumClick('9')">9
                                    </el-button>
                                </el-col>
                            </el-row>
                            <el-row :gutter="10" style="margin-bottom: 10px;">
                                <el-col :span="8">
                                    <el-button type="info" class="sakButton" @click="NumClick('0')">0
                                    </el-button>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="info" class="sakButton" @click="NumClick('00')">00
                                    </el-button>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="info" class="sakButton" @click="NumClick('.')">.
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" class="sakButton big" icon="el-icon-check"
                                       @click="NumSubmit">
                            </el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" style="margin-bottom: 20px;">
                <el-card class="box-card" style="width:100%;">
                    <div slot="header">
                        <span>收款记录（最近10条）</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"
                                   @click="QueryTrxList">刷新
                        </el-button>
                    </div>
                    <el-table
                            :data="trxList"
                            stripe
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop="date"
                                label="收款时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="付款账户">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                align="right"
                                prop="quantity"
                                width="150"
                                label="收款金额">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="开始收款" :visible.sync="dialogFormVisible" custom-class="sakDialog" :close-on-click-modal="false"
                   :close-on-press-escape="false" :show-close="false">
            <div v-loading="isScanning" :element-loading-text="scanningText">
                <el-form :model="form">
                    <el-form-item label="付款账户" label-width="80">
                        <el-input v-model="form.name" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="付款金额" label-width="80">
                        <el-input v-model="form.number" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="付款币种" label-width="80">
                        <el-input v-model="form.token" readonly></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="UserRequest" v-if="!isScanning">发 起</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    /* eslint-disable no-undef */
    import * as moment from 'moment'

    let Eos = require('eosjs')

    export default {
        name: 'Scan',
        data() {
            return {
                host: configObj.host,
                selfAccount: configObj.account,
                options: configObj.options,
                form: {
                    to: '',
                    number: '收款金额',
                    token: ''
                    // number: '1.0000',
                    // token: 'TOK'
                },
                dialogFormVisible: false,
                isScanning: false,
                scanningText: '',
                scanValue: '',
                autoRequest: true,
                lastId: -1,
                isRun: false,
                trxList: []
            }
        },
        created: function () {
            let self = this
            self.$emit('setTop', {activeIndex: '1'})
            self.QueryTrxList()
        },
        beforeDestroy: function () {
            this.isRun = false
            this.QueryTask = function () {
                console.log('over')
            }
        },
        destroyed: function () {
            this.isRun = false
        },
        watch: {
            scanValue: function (val) {
                let self = this
                try {
                    let obj = JSON.parse(val)
                    if (obj.head == 'disToken_QR' && obj.type == 'pos_pay') {
                        // console.log(obj.name)
                        self.form.name = obj.name
                        self.isScanning = false
                        if (self.autoRequest) {
                            self.UserRequest()
                        }
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        },
        methods: {
            GetMoment: function (date) {
                return moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
            },
// eslint-disable-next-line no-unused-vars
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'success-row'
                }
                return ''
            },
            NumClick: function (str) {
                let self = this
                if (self.form.number == '收款金额') {
                    self.form.number = str
                } else {
                    self.form.number += str
                }
            },
            NumDelete: function () {
                let self = this
                if (self.form.number != '收款金额') {
                    self.form.number = self.form.number.substring(0, self.form.number.length - 1)
                }
                if (self.form.number == '') {
                    self.form.number = '收款金额'
                }
            },
            NumClear: function () {
                let self = this
                self.form.number = '收款金额'
                // self.form.token = ''
            },
            NumSubmit: function () {
                let self = this
                let reg = /^\d+(\.\d{1,4})?$/
                let f = Number.parseFloat(self.form.number)
                let s = f.toFixed(4)
                if (self.form.token == '') {
                    self.$alert('没有选择收款币种', '参数不正确', {
                        confirmButtonText: '关闭',
                        type: 'warning',
                        customClass: 'sakAlert'
                    })
                } else if (!reg.test(self.form.number) || f <= 0) {
                    self.$alert('收款金额不正确（最多四位小数）', '参数不正确', {
                        confirmButtonText: '关闭',
                        type: 'warning',
                        customClass: 'sakAlert'
                    })
                } else {
                    self.form.number = s
                    self.dialogFormVisible = true
                    self.isScanning = true
                    self.scanningText = '拼命扫描中'
                    self.scanValue = ''
                    self.$refs['scanInput'].focus()
                }
            },
            closeDialog: function () {
                let self = this
                self.isRun = false
                self.dialogFormVisible = false
                self.$refs['notScanInput'].focus()
            },
            UserRequest: function () {
                let self = this
                let obj = {
                    head: 'disToken_MSG',
                    type: 'pos_pay',
                    msg: {
                        to: self.selfAccount,
                        number: self.form.number,
                        token: self.form.token
                    }
                }
                obj = JSON.stringify(obj)
                self.SendMsg(self.form.name, obj)
            },
            SendMsg: function (to, msg) {
                let self = this
                self.isScanning = true
                self.scanningText = '通知付款中'
                self.$http.post(`${self.host}/msg/SendMsg`, {
                    to: to,
                    umsg: msg
                }, {emulateJSON: true}).then(() => {
                    // let data = res.data
                    // console.log(data)
                    self.isScanning = true
                    self.scanningText = '等待回执中'
                    self.isRun = true
                    self.QueryTask()
                }, res => {
                    self.isScanning = false
                    console.log(res)
                })
            },
            QueryTask: function () {
                let self = this
                self.QueryNewMsg(self.lastId, function (res) {
                    let datas = res.datas
                    if (datas.length > 0 && self.lastId != -1) {
                        let tmp = datas[datas.length - 1]
                        console.log(tmp.trx_id)
                        self.isRun = false
                        self.isScanning = false
                        self.dialogFormVisible = false
                        self.QueryTrxList()
                        self.$alert('收款成功，详情看列表', '收款结果', {
                            confirmButtonText: '关闭',
                            type: 'success',
                            customClass: 'sakAlert'
                        })
                    } else {
                        self.isRun = true
                    }
                    self.lastId = res.lastId
                    if (self.isRun) {
                        setTimeout(function () {
                            self.QueryTask()
                        }, 500)
                    }
                })
            },
            QueryNewMsg: function (id, cb) {
                let self = this
                let config = configObj.config
                let eos = Eos(config)
                let accountName = self.selfAccount
                let pos = -1
                let offset = -10
                eos.getActions(accountName, pos, offset).then(result => {
                    let actions = result.actions
                    let list = []
                    let res = {
                        datas: [],
                        lastId: -1
                    }
                    for (let i in actions) {
                        let tmp = actions[i]
                        if (tmp.action_trace.receipt.receiver == accountName && tmp.action_trace.act.name == 'transfer' && tmp.action_trace.act.data.from == self.form.name && tmp.action_trace.act.data.to == accountName && tmp.action_trace.act.data.quantity == `${self.form.number} ${self.form.token}`)
                            list.push(tmp)
                    }
                    res.lastId = actions.length == 0 ? 0 : actions[actions.length - 1].account_action_seq
                    if (list.length > 0) {
                        for (let i in list) {
                            let obj = list[i]
                            let data = {
                                id: -1,
                                trx_id: ''
                            }
                            data.id = obj.account_action_seq
                            data.trx_id = obj.action_trace.trx_id
                            if (data.id > id || data.id == 0) {
                                res.datas.push(data)
                            }
                            if (i == list.length - 1) {
                                res.lastId = data.id
                            }
                        }
                    }
                    cb(res)
                }).catch(error => {
                    console.log(error)
                })
            },
            QueryTrxList: function () {
                let self = this
                let config = configObj.config
                let eos = Eos(config)
                let accountName = self.selfAccount
                let pos = -1
                let offset = -20
                eos.getActions(accountName, pos, offset).then(result => {
                    let actions = result.actions
                    let list = []
                    for (let i in actions) {
                        let tmp = actions[i]
                        if (tmp.action_trace.receipt.receiver == accountName && tmp.action_trace.act.name == 'transfer' && tmp.action_trace.act.account != 'sakmsg' && tmp.action_trace.act.data.to == accountName)
                            list.push({
                                date: self.GetMoment(tmp.block_time),
                                name: tmp.action_trace.act.data.from,
                                quantity: tmp.action_trace.act.data.quantity
                            })
                    }
                    list = list.reverse()
                    let list2 = []
                    for (let i in list) {
                        if (i < 10) {
                            let t = list[i]
                            if (i == 0) {
                                t.tableRowClassName = 'success-row'
                            }
                            list2.push(t)
                        }
                    }
                    self.trxList = list2
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style>
    .sakAlert {
        width: 320px !important;
        vertical-align: top !important;
        margin-top: 150px;
    }

    .sakDialog {
        width: 90% !important;
        margin-top: 90px !important;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .sakButton {
        width: 100%;
        height: 90px;
        font-size: 22px !important;
    }

    .sakButton.big {
        height: 190px;
    }
</style>
