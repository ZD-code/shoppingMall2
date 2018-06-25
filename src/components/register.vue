<template>
    <div>
        <van-nav-bar title='用户注册' left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
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
               <van-button type="primary" size="large" @click='registerForm' :loading="isShowLoading">马上注册</van-button>
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
            checkform() {
                let isOk = true;
                if (this.username.trim().length < 5) {
                    this.userNameMsg = '用户名长度不能小于5';
                    isOk = false;
                } else {
                    this.usernamemsg = ''
                }

                if (this.password.trim().length < 6) {
                    isOk = false;
                    this.passwordMsg = '密码长度不能小于6';
                } else {
                    this.passwordMsg = '';
                }

                return isOk;
            },
            registerForm() {
                this.checkform() && this.axiosRegisterUser();
            },
            axiosRegisterUser() {
                this.isShowLoading = true; //开启loading
                axios({
                        url: url.registerUser,
                        method: 'post',
                        data: {
                            userName: this.username.trim(),
                            password: this.password.trim()
                        }
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 200) {
                            Toast.success('注册成功');
                            this.$router.push('/'); //注册成功，跳转首页
                        } else {
                            console.log(res.data.message);
                            Toast.fail('注册失败');
                            this.isShowLoading = false;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Toast.fail('注册失败');
                        this.isShowLoading = false;
                    })
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