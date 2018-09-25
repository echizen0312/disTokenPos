<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">扫码收款</el-menu-item>
                    <el-menu-item index="2">本机钱包</el-menu-item>
                </el-menu>
            </el-header>
            <el-main style="">
                <router-view ref="child"/>
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
                    this.$router.replace('/Other')
                }
            }
        }
    }
</script>

<style>

</style>
