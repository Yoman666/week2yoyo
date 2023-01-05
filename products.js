import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    // 資料設定
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'yoyo123456',
            products : [],
            temp:{},

        };
    },

    //初始化
    mounted(){
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        //叫一下checkAdmin確認登入訊息
        this.checkAdmin();

    },
    methods: {
        //SOP: 1.API URL設定 ; 2. axios.方法(apiurl).then.catch;
        //使用者登入檢查
        //正確:叫一下getData調資料給我看
        //錯誤:請滾從頭來
        checkAdmin(){
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url).then(()=>{
                this.getData();
            }).catch((err)=>{
                window.location = './index.html';
                alert("非禮勿近");
            });
        },
        //調資料出來看看
        //正確:把後台資料先調到products空的陣列中
        getData(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
            axios.get(url).then((response)=>{
                this.products = response.data.products;
                console.log(this.products);
            }).catch((err)=>{
                alert(err.response.data.message);
            });

        }
    },
}).mount('#app');

