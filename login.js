// 起手式
// import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
// createApp({
//     data() {
//         return{
//             text:'23',
//         };
//     },
//     methods:{

//     },
// }).mount('#app');

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
createApp({
    data() {
        return{
            //api文件位置/v2
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            //singin api 所需要的 data
            user:{
                username: '',
                password: '' ,
            }
        };
    },
    methods:{
        // 登入funtion 在表單送出時會呼叫
        login(){
            //singin api url
            const api= `${this.apiUrl}/admin/signin`;

            //axios.方法(api, data).成功(()=>{}).失敗(()=>{});
            //記得的要加this
            axios.post(api, this.user).then((response) => {
                //成功的話記住token,expired的data
                const {token, expired} = response.data;
                //將token,expired寫入cookie內
                document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                //成功的話直接跳轉到products頁面
                window.location = 'products.html';
                alert("成功登入");
            }).catch((err) => {
                //失敗的話跳出失敗的訊息
                // alert(err.response.data.message);
                alert("哈哈哈登入錯誤笑你");
            });
        },
    },
}).mount('#app');