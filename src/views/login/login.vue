<template>
    <div id='login'>
        <div class='login_box'>
            <div class='login_logo'>
                <img src="../../assets/图片1.png" alt="">
                <span>原油管道混油界面跟踪系统</span>
            </div>
            <div class='login_content'>
                <div class='login_left'>
                    <img src="../../assets/tit_biaoyu.png" alt="">
                </div>
                <div class='login_right'>
                    <p class='login_title'>用户登录</p>
                    <Input v-model="username" placeholder="用户名" style="width: 455px;" />
                    <Input type='password' v-model="pwd" placeholder="密码" style="width: 455px;" />
                    <Button type="primary" @click.native='login_btn' style="font-size:26px">登录</Button>
                </div>
            </div>
        </div>
        <div class='fail_warning' v-show='error_warnning'>
            <Alert banner closable type="warning">登录失败，请重新尝试; 如遇到问题，请联系管理员 400820820</Alert>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {error_warnning:false,username:'',pwd:''}
        },
      
        mounted(){
           
        },
        methods:{
            //登录信息验证
            login_btn(){
                this.axios.get('/OilTrack/login/in',{params:{account:this.username,password:this.pwd}}).then(res=>{
                   
                   if(res.data.code=='500'){
                        this.error_warnning=true;
                    }else{
                        this.$router.push('/manageWork')
                        sessionStorage.setItem('uid',res.data.data.ryzhid); // 设置本地存储信息 
                        sessionStorage.setItem('pwd',res.data.data.dlmm);
                        //this.$store.commit('changePwd',res.data.data.dlmm);
                        this.$router.push(this.$route.query.redirect); // 跳转至前一页，this.$route.query.redirect是获取上面传递过来的值
                    }
                })
               
            }
        },

    }
</script>
<style lang="stylus">
    .fail_warning
        width 100%!important
        .ivu-alert-warning
            width 100%
            height 33px!important
            background #D7C194
            opacity 0.7
            position absolute
            bottom 0px
            text-align center
            border 0
            span 
                width 421px
                height 15px
                font-size 14px
                font-family MicrosoftYaHei
                font-weight 400 
                color rgba(199,9,9,1)
                line-height 22px
    .login_right
        .ivu-input-wrapper
            margin-bottom 34px
            .ivu-input
                border-radius 0px
                height 54px
                background rgba(255,255,255,1)
                border 1px solid rgba(230,230,230,1)
                font-size 20px
</style>

<style lang="stylus" scoped>
   
  
    .ivu-btn
        width 455px
        height 48px
        background #539BF3
        border-radius 0px
        box-shadow  0px 2px 0px #3B87E4;
    #login
        background url(../../assets/pic_big_bj.jpg) no-repeat 
        background-size 100% 100% 
        position relative
        height 100%
        width 100%
        position: fixed;
    .login_box
        width 1111px
        height 600px
        margin 0 auto
        padding-top 60px
        .login_logo
            text-align left
            margin-bottom 40px
            img 
                width 57px
                height 61px
                vertical-align bottom
                margin-right 28px
            span 
                color #182133
                font-size 35px
                font-weight Bold
                font-family MicrosoftYaHei-Bold
        .login_content
            width 1111px
            height 508px
            background #F0F5FD
            box-shadow 0px 8px 16px 0px rgba(68,92,138,0.22)
            padding 85px
            .login_left
                width 400px
                height 308px
                margin-top 86px
                float left
            .login_right
                width 460px
                height 469px
                margin 0 auto
                float right
                .login_title
                    font-size 30px
                    color #1E1F21
                    font-family MicrosoftYaHei
                    margin-bottom 50px
                
</style>
