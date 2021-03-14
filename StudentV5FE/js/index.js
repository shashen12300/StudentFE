const app = new Vue({
    el: '#app',
    data: {
        msg: 'Hello Vue!',
        students: [],  // 所有学生信息
        pageStudents: [], //页学生数据
        baseUrl: 'http://192.168.3.102:8000/',
        inputStr: '', //查询条件
        dialogVisible: false, // dialog弹出框
        // ======= 分页相关的变量 =======
        total: 0,    // 数据总行数
        currentpage:1, // 当前所在页
        pagesize:10,   // 每页显示行数
    },
    mounted() {
        // 自动加载数据
        this.getStudents();
    },
    methods: {
        // 获取所有学生信息
        getStudents:function(){
            // 记录this的地址
            let that = this
            // 使用Axios实现Ajax请求
            axios
            .get(this.baseUrl + 'students/')
            .then(function (res) {
                // 请求成功后执行函数
                if(res.data.code == 1) {
                    // 把总数据给students
                    that.students = res.data.data;
                    // 获取返回记录总行数
                    that.total = res.data.data.length;
                    // 获取当前页的数据
                    that.getPageStudents();
                that.$message({
                    showClose: true,
                    message: '数据加载成功！',
                    type: 'success'
                  });
                }else {
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
        },
        // 获取当前页的学生数据
        getPageStudents:function() {
            // 清除页学生数据
            this.pageStudents = [];
            // 获取当前页学生数据
            for(let i = (this.currentpage - 1) * this.pagesize ; i < this.total; i++) {
                // 遍历数据添加到pageStudents中
                this.pageStudents.push(this.students[i]);
                // p判断是否达到一页的要求
                if(this.pageStudents.length == this.pagesize) break;
            }
        },
        // 获取所有学生信息
        getAllStudents() {
            this.inputStr = '';
            this.getStudents();
        },
        // 实现学生信息查询
        queryStudents(){
            // 记录this的地址
            let that = this
            // 使用Axios实现Ajax请求
            axios
            .post(this.baseUrl + 'students/query/', 
            {
                inputstr: that.inputStr
            })
            .then(function (res) {
                // 请求成功后执行函数
                if(res.data.code == 1) {
                    // 把总数据给students
                    that.students = res.data.data;
                    // 获取返回记录总行数
                    that.total = res.data.data.length;
                    // 获取当前页的数据
                    that.getPageStudents();
                that.$message({
                    showClose: true,
                    message: '数据查询成功！',
                    type: 'success'
                  });
                }else {
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
        },
        // 添加学生信息
        addStudent() {
            this.dialogVisible = true;
        },
        // 分页时修改每页的行数
        handleSizeChange(size) {
            this.pagesize = size;
            // 刷新当前页面
            this.getPageStudents();
        },
        // 调整当前页码
        handleCurrentChange(pageNumber) {
            this.currentpage = pageNumber;
            // 刷新当前页面
            this.getPageStudents();
        }
    }
});