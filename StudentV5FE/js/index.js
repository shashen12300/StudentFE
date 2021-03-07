const app = new Vue({
    el: '#app',
    data: {
        msg: 'Hello Vue!',
        students: [
            {
                sno: 95001, name: '刘建辉', gender: '男', birthday: '1991年7月23日',
                email: 'liujianhui@qq.com', address: '北京市西城区展览路'
            },
            {
                sno: 95002, name: '陈燕', gender: '女', birthday: '1991年6月23日',
                email: 'chenyan@qq.com', address: '北京市西城车公庄大街'
            },
            {
                sno: 95003, name: '马建', gender: '男', birthday: '1991年7月26日',
                email: 'majian@qq.com', address: '北京市石景山区古城北路'
            },
            {
                sno: 95001, name: '刘建辉', gender: '男', birthday: '1991年7月23日',
                email: 'liujianhui@qq.com', address: '北京市西城区展览路'
            },
            {
                sno: 95002, name: '陈燕', gender: '女', birthday: '1991年6月23日',
                email: 'chenyan@qq.com', address: '北京市西城车公庄大街'
            },
            {
                sno: 95003, name: '马建', gender: '男', birthday: '1991年7月26日',
                email: 'majian@qq.com', address: '北京市石景山区古城北路'
            },
            {
                sno: 95001, name: '刘建辉', gender: '男', birthday: '1991年7月23日',
                email: 'liujianhui@qq.com', address: '北京市西城区展览路'
            },
            {
                sno: 95002, name: '陈燕', gender: '女', birthday: '1991年6月23日',
                email: 'chenyan@qq.com', address: '北京市西城车公庄大街'
            },
            {
                sno: 95003, name: '马建', gender: '男', birthday: '1991年7月26日',
                email: 'majian@qq.com', address: '北京市石景山区古城北路'
            },
            {
                sno: 95001, name: '刘建辉', gender: '男', birthday: '1991年7月23日',
                email: 'liujianhui@qq.com', address: '北京市西城区展览路'
            },
        ],
        total: 100, //数据总行数
        currentpage:1, //当前所在页
        pagesize:10, //每页显示行数
    }});