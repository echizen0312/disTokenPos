<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">扫码收款</el-menu-item>
                    <el-menu-item index="2">钱包余额</el-menu-item>
                </el-menu>
            </el-header>
            <el-main style="height: 100%;">
                <router-view v-on:setTop="setTopFromChild" ref="child"/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                activeIndex: '1'
            }
        },
        created: function () {

        },
        methods: {
            handleSelect(key) {
                if (key == '1') {
                    this.$router.replace('/Scan')
                }
                if (key == '2') {
                    this.$router.replace('/Info')
                }
            },
            setTopFromChild(data) {
                this.activeIndex = data.activeIndex
            }
        }
    }
</script>

<style>
    html {
        background-color: #F2F6FC;
    }

    #app {
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*padding: 10px;*/
        padding-top: 18px;
    }
</style>
