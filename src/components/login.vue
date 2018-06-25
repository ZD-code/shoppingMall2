<template>
    <div>
        <van-nav-bar title='用户登录' left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
       <div class="register-panel">
        
           <van-field
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            @click-icon=" username = ''"
            :error-message="userNameMsg"
           >
           </van-field>

           <van-field
            v-model="password"
            label="密码"
            icon='clear'
            placeholder="请输入密码"
            required
            type="password"
            :error-message="passwordMsg"
            @click-icon="password = ''"
           ></van-field>
           <div class="register-btn">
               <van-button type="primary" size="large" @click='axiosLoginUser' :loading="isShowLoading">登录</van-button>
           </div>
       </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import url from "@/apiConfig"; //引入接口配置文件
    import {
        Toast
    } from "vant";

    export default {
        data() {
            return {
                username: '',
                password: '',
                isShowLoading: false,
                userNameMsg: '',
                passwordMsg: ''
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            axiosLoginUser() {
                this.isShowLoading = true; //开启loading
                axios({
                        url: url.login,
                        method: 'post',
                        data: {
                            userName: this.username,
                            password: this.password
                        }
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 200 && res.data.message) {

                            new Promise((resolve, reject) => {
                                    localStorage.loginInfo = {
                                        userName: this.userName
                                    }
                                    setTimeout(() => {
                                        resolve();
                                    }, 500);
                                })
                                .then(() => {
                                    Toast.success('登录成功');
                                    this.$router.push('/'); //登录成功，跳转首页
                                })
                                .catch(err => {
                                    Toast.fail('登录状态保存失败');

                                })
                        } else {
                            console.log(res.data.message);
                            Toast.fail('登录失败');
                            this.isShowLoading = false;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Toast.fail('登录失败');
                        this.isShowLoading = false;
                    })
            }
        },
        created() {
            if (localStorage.loginInfo) {
                Toast.success('您已登录');
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .register-panel {
        width: 96%;
        border-radius: 5px;
        margin: 20px auto;
        padding-bottom: 50px;
    }
    
    .register-btn {
        padding-top: 10px;
    }
</style>