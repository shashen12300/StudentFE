const app = new Vue({
    el: '#app',
    data() {
        // 校验学号是否存在
        const ruleSNo = (rule, value, callback) => {
            // 修改学生信息不需要校验学号是否存在
            if (this.isEdit) {
                callback();
            }
            // 使用Axios进行校验
            axios
                .post(this.baseUrl + 'students/sno/check/',
                    {
                        sno: value
                    })
                .then((res) => {
                    if (res.data.code == 1) {
                        if (res.data.exists) {
                            callback(new Error("学号已经存在"));
                        } else {
                            callback();
                        }
                    } else {
                        // 请求失败
                        callback(new Error('校验学号后端出现异常！'))
                    }
                })
                .catch((err) => {
                    // 如果请求失败在控制台打印
                    console.log(err)
                })
        }

        return {
            students: [],  // 所有学生信息
            pageStudents: [], //页学生数据
            // baseUrl: 'http://192.168.31.113:8000/',
            baseUrl: 'http://192.168.3.102:8000/',

            inputStr: '', //查询条件
            // ======= 分页相关的变量 =======
            total: 0,    // 数据总行数
            currentpage: 1, // 当前所在页
            pagesize: 10,   // 每页显示行数
            // ======= 弹出窗相关的变量 ======
            dialogVisible: false, // 是否弹出dialog弹出框
            isView: false, // 是否查看学生信息
            isEdit: false, // 是否修改学生信息
            studentForm: {
                sno: '',
                name: '',
                gender: '',
                birthday: '',
                mobile: '',
                email: '',
                address: '',
                image: '',
            },
            rules: {
                sno: [
                    { required: true, message: "学号不能为空", trigger: "blur" },
                    { pattern: /^[9][5]\d{3}$/, message: "学号必须是95开头的5位数字", trigger: "blur" },
                    { validator: ruleSNo, trigger: "blur" }
                ],
                name: [
                    { required: true, message: "姓名不能为空", trigger: "blur" },
                    { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: "姓名必须是2到5个汉字", trigger: "blur" }
                ],
                gender: [
                    { required: true, message: "性别不能为空", trigger: "change" },
                ],
                birthday: [
                    { required: true, message: "出生日期不能为空", trigger: "change" },
                ],
                mobile: [
                    { required: true, message: "手机号码不能为空", trigger: "blur" },
                    { pattern: /^1[0-9]{10}$/, message: "手机号码必须要符合规范", trigger: "blur" }
                ],
                email: [
                    { required: true, message: "邮箱不能为空", trigger: "blur" },
                    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: "邮箱必须要符合规范", trigger: "blur" }
                ],
                address: [
                    { required: true, message: "家庭住址不能为空", trigger: "blur" },
                ]
            }
        }
    },
    mounted() {
        // 自动加载数据
        this.getStudents();
    },
    methods: {
        // 获取所有学生信息
        getStudents: function () {
            // 记录this的地址
            let that = this
            // 使用Axios实现Ajax请求
            axios
                .get(this.baseUrl + 'students/')
                .then(function (res) {
                    // 请求成功后执行函数
                    if (res.data.code == 1) {
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
                    } else {
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 获取当前页的学生数据
        getPageStudents: function () {
            // 清除页学生数据
            this.pageStudents = [];
            // 获取当前页学生数据
            for (let i = (this.currentpage - 1) * this.pagesize; i < this.total; i++) {
                // 遍历数据添加到pageStudents中
                this.pageStudents.push(this.students[i]);
                // p判断是否达到一页的要求
                if (this.pageStudents.length == this.pagesize) break;
            }
        },
        // 获取所有学生信息
        getAllStudents() {
            this.inputStr = '';
            this.getStudents();
        },
        // 实现学生信息查询
        queryStudents() {
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
                    if (res.data.code == 1) {
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
                    } else {
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 添加学生信息
        addStudent() {
            this.dialogVisible = true;
        },
        // 查看学生信息
        viewStudent(row) {
            // 深拷贝
            this.studentForm = JSON.parse(JSON.stringify(row));
            this.isView = true;
            this.dialogVisible = true;

        },
        // 修改学生信息
        updateStudent(row) {
            // 深拷贝
            this.studentForm = JSON.parse(JSON.stringify(row));
            this.isEdit = true;
            this.dialogVisible = true;
        },
        // 提交学生的表单（添加、修改）
        submitStudentForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 校验成功后执行添加或者修改
                    if (this.isEdit) {
                        // 修改
                        this.submitUpdateStudent();

                    } else {
                        // 添加
                        this.submitAddStudent();
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitUpdateStudent() {
            // 记录this的地址
            let that = this
            // 使用Axios实现Ajax请求
            axios
                .post(this.baseUrl + 'student/update/', that.studentForm)
                .then(function (res) {
                    // 请求成功后执行函数
                    if (res.data.code == 1) {
                        // 把总数据给students
                        that.students = res.data.data;
                        // 获取返回记录总行数
                        that.total = res.data.data.length;
                        // 获取当前页的数据
                        that.getPageStudents();
                        that.$message({
                            showClose: true,
                            message: '修改学生信息成功！',
                            type: 'success'
                        });
                        that.dialogVisible = false
                    } else {
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        submitAddStudent() {
            // 记录this的地址
            let that = this
            // 使用Axios实现Ajax请求
            axios
                .post(this.baseUrl + 'student/add/', that.studentForm)
                .then(function (res) {
                    // 请求成功后执行函数
                    if (res.data.code == 1) {
                        // 把总数据给students
                        that.students = res.data.data;
                        // 获取返回记录总行数
                        that.total = res.data.data.length;
                        // 获取当前页的数据
                        that.getPageStudents();
                        that.$message({
                            showClose: true,
                            message: '添加学生信息成功！',
                            type: 'success'
                        });
                        that.dialogVisible = false
                    } else {
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 删除一条学生记录
        deleteStudent(row) {
            // 删除记录提示信息
            this.$confirm('是否确认删除学生信息【学号: ' + row.sno + '\t姓名:' + row.name + '】', '提示', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                // 记录this的地址
                let that = this
                // 使用Axios实现Ajax请求
                axios
                    .post(this.baseUrl + 'student/delete/', {sno: row.sno})
                    .then(function (res) {
                        // 请求成功后执行函数
                        if (res.data.code == 1) {
                            // 把总数据给students
                            that.students = res.data.data;
                            // 获取返回记录总行数
                            that.total = res.data.data.length;
                            // 获取当前页的数据
                            that.getPageStudents();
                            that.$message({
                                showClose: true,
                                message: '删除学生信息成功！',
                                type: 'success'
                            });
                        } else {
                            that.$message.error(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },

        // 关闭弹出框时清除内容
        closeDialogForm(formName) {
            // 充值表单提示信息
            this.$refs[formName].resetFields();

            this.studentForm.sno = "";
            this.studentForm.name = "";
            this.studentForm.gender = "";
            this.studentForm.mobile = "";
            this.studentForm.birthday = "";
            this.studentForm.email = "";
            this.studentForm.address = "";
            // 清除弹出框状态
            this.isEdit = false;
            this.isView = false;
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