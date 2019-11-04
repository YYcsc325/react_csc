const menuData = [
    {
        title: '用户管理',
        key: '01',
        icon: 'user',
        children: [
            {
                title: '用户列表',
                key: '01-01',
                url: '/user/list'
            },
            {
                title: '增加用户',
                key: '01-02',
                url: '/user/add'
            }
        ]
    },
    {
        title: '个人中心',
        key: '02',
        icon: 'laptop',
        children: [
            {
                title: '个人处理',
                key: '02-01',
                url: '/article/list'
            },
            {
                title: '个人相册',
                key: '02-02',
                url: '/article/add'
            }
        ]
    },{
        title: '异常处理',
        key: '03',
        icon: 'notification',
        children: [
            {
                title: '日志报错',
                key: '03-01',
                url: '/home'
            },
            {
                title: '收件邮箱',
                key: '03-02',
                url: '/home'
            }
        ]
    }
]

export default menuData;