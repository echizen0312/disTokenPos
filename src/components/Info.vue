<template>
    <div style="width: 100%; display: flex; justify-content: center;">
        <el-row :gutter="20" style="width: 100%;">
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" style="margin-bottom: 20px;">
                <el-card class="box-card" style="width:100%; min-width: 299px; margin-bottom: 20px;">
                    <div slot="header">
                        <span>账户详情</span>
                    </div>
                    <div class="info-item">
                        <div class="item-left">
                            <i class="el-icon-service" style="font-size: 20px;"></i>
                        </div>
                        <div class="item-center">{{ selfAccount }}</div>
                        <div class="item-right">账户</div>
                    </div>
                    <div class="item-split"></div>
                    <div class="info-item">
                        <div class="item-left">
                            <i class="el-icon-info" style="font-size: 20px;"></i>
                        </div>
                        <div class="item-center">{{ net }}</div>
                        <div class="item-right">网络</div>
                    </div>
                </el-card>
                <el-card class="box-card" style="width:100%; min-width: 299px;">
                    <div slot="header">
                        <span>账户资源</span>
                    </div>
                    <div class="info-item">
                        <div class="item-left">
                            <i class="el-icon-caret-right" style="font-size: 20px;"></i>
                        </div>
                        <div class="item-center">{{ account.ram.ram_usage }} / {{ account.ram.ram_quota }}</div>
                        <div class="item-right">RAM</div>
                    </div>
                    <div class="item-split"></div>
                    <div class="info-item">
                        <div class="item-left">
                            <i class="el-icon-caret-right" style="font-size: 20px;"></i>
                        </div>
                        <div class="item-center">{{ account.cpu.used }} / {{ account.cpu.max }}</div>
                        <div class="item-right">CPU</div>
                    </div>
                    <div class="item-split"></div>
                    <div class="info-item">
                        <div class="item-left">
                            <i class="el-icon-caret-right" style="font-size: 20px;"></i>
                        </div>
                        <div class="item-center">{{ account.net.used }} / {{ account.net.max }}</div>
                        <div class="item-right">NET</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" style="margin-bottom: 20px;">
                <el-card class="box-card" style="width:100%;">
                    <div slot="header">
                        <span>余额</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh"
                                   @click="Refresh">刷新
                        </el-button>
                    </div>
                    <div class="info-item">
                        <div class="item-left">
                            <i class="el-icon-goods" style="font-size: 20px;"></i>
                        </div>
                        <div class="item-center">{{ sysToken.balance }}</div>
                        <div class="item-right">{{ sysToken.name }}</div>
                    </div>
                    <template v-for="(token, index) in userToken">
                        <div class="item-split" :key="token.account + token.name + index"></div>
                        <div class="info-item" :key="token.account + token.name">
                            <div class="item-left">
                                <i class="el-icon-goods" style="font-size: 20px;"></i>
                            </div>
                            <div class="item-center">{{ token.balance }}</div>
                            <div class="item-right">{{ token.name }}</div>
                        </div>
                    </template>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /* eslint-disable no-undef */
    import * as moment from 'moment'

    let Eos = require('eosjs')

    export default {
        name: 'Info',
        data() {
            return {
                net: configObj.name,
                host: configObj.host,
                selfAccount: configObj.account,
                config: configObj.config,
                sysToken: configObj.sysToken,
                userToken: configObj.userToken,
                account: {
                    id: 0,
                    name: configObj.account,
                    netName: configObj.name,
                    key: '',
                    ram: {
                        ram_quota: '0',
                        ram_usage: '0'
                    },
                    cpu: {
                        max: '0',
                        available: '0',
                        used: '0'
                    },
                    net: {
                        max: '0',
                        available: '0',
                        used: '0'
                    }
                }
            }
        },
        created: function () {
            let self = this
            self.$emit('setTop', {activeIndex: '2'})
            self.getAccount(self.account)
            self.Refresh()
        },
        methods: {
            GetMoment: function (date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            },
            getByteSize: function (net) {
                let len = 2
                let s = ''
                if (net < 1024) {
                    s = net.toFixed(len).toString() + 'B'
                } else {
                    net /= 1024
                    if (net < 1024) {
                        s = net.toFixed(len).toString() + 'KB'
                    } else {
                        net /= 1024
                        if (net < 1024) {
                            s = net.toFixed(len).toString() + 'MB'
                        } else {
                            net /= 1024
                            if (net < 1024) {
                                s = net.toFixed(len).toString() + 'GB'
                            } else {
                                net /= 1024
                                s = net.toFixed(len).toString() + 'TB'
                            }
                        }
                    }
                }
                return s
            },
            getTimeSize: function (net) {
                let len = 2
                let s = ''
                if (net < 1000) {
                    s = net.toFixed(len).toString() + 'ns'
                } else {
                    net /= 1000
                    if (net < 1000) {
                        s = net.toFixed(len).toString() + 'ms'
                    } else {
                        net /= 1000
                        if (net < 60) {
                            s = net.toFixed(len).toString() + 'sec'
                        } else {
                            net /= 60
                            if (net < 60) {
                                s = net.toFixed(len).toString() + 'min'
                            } else {
                                net /= 60
                                s = net.toFixed(len).toString() + 'hr'
                            }
                        }
                    }
                }
                return s
            },
            getAccount: function (acc) {
                let self = this
                let config = self.config
                let eos = Eos(config)
                eos.getAccount({
                    account_name: acc.name
                }).then(result => {
                    // cpu
                    let cpu = {
                        max: self.getTimeSize(Number.parseFloat(result.cpu_limit.max)),
                        available: self.getTimeSize(Number.parseFloat(result.cpu_limit.available)),
                        used: self.getTimeSize(Number.parseFloat(result.cpu_limit.used))
                    }
                    // net
                    let net = {
                        max: self.getByteSize(Number.parseFloat(result.net_limit.max)),
                        available: self.getByteSize(Number.parseFloat(result.net_limit.available)),
                        used: self.getByteSize(Number.parseFloat(result.net_limit.used))
                    }
                    // ram
                    let ram = {
                        ram_quota: self.getByteSize(result.ram_quota),
                        ram_usage: self.getByteSize(result.ram_usage)
                    }
                    acc.ram = ram
                    acc.net = net
                    acc.cpu = cpu
                    self.account = acc
                }).catch(error => {
                    console.log(error)
                })
            },
            Refresh: function () {
                let self = this
                self.getSysBalance()
                self.getUserBalance()
            },
            getSysBalance: function () {
                let self = this
                let config = self.config
                let eos = Eos(config)
                eos.getCurrencyBalance({
                    code: self.sysToken.account,
                    account: self.selfAccount,
                    symbol: self.sysToken.name
                }).then(result => {
                    if (result.length === 0) {
                        self.sysToken.balance = 0
                    } else {
                        self.sysToken.balance = Number.parseFloat(result[0].split(' EOS')[0])
                    }
                }).catch(error => {
                    console.log(error)
                    self.sysToken.balance = 0
                })
            },
            getUserBalance: function () {
                let self = this
                let config = self.config
                let eos = Eos(config)
                for (let i in self.userToken) {
                    let token = self.userToken[i]
                    eos.getCurrencyBalance({
                        code: token.account,
                        account: self.selfAccount,
                        symbol: token.name
                    }).then(result => {
                        if (result.length === 0) {
                            token.balance = 0
                        } else {
                            token.balance = Number.parseFloat(result[0].split(` ${token.name}`)[0])
                        }
                    }).catch(error => {
                        console.log(error)
                        token.balance = 0
                    })
                }
            }

        }
    }
</script>

<style scoped>
    .info-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 17px;
    }

    .info-item:first-child {
        margin-top: 0
    }

    .info-item:last-child {
        margin-bottom: 0
    }

    .info-item .item-left {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-item .item-center {
        flex: 1;
        height: 40px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .info-item .item-right {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
    }

    .item-split {
        height: 1px;
        margin: 6px 0 6px 48px;
        background-color: #E4E7ED;
    }
</style>
