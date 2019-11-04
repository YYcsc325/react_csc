const menuData = [
    {
        title: '用户管理',
        key: '01',
        icon: 'user',
        level: '1',
        children: [
            {
                title: '用户列表',
                key: '01-01',
                url: '/user/list',
                level: '2',
            },
            {
                title: '增加用户',
                key: '01-02',
                url: '/user/add',
                level: '2',
            }
        ]
    },
    {
        title: '个人中心',
        key: '02',
        icon: 'laptop',
        level: '1',
        children: [
            {
                title: '个人处理',
                key: '02-01',
                url: '/article/list',
                level: '2',
            },
            {
                title: '个人相册',
                key: '02-02',
                url: '/article/add',
                level: '2',
            }
        ]
    },{
        title: '异常处理',
        key: '03',
        icon: 'notification',
        level: '1',
        children: [
            {
                title: '日志报错',
                key: '03-01',
                url: '/home',
                level: '2',
            },
            {
                title: '收件邮箱',
                key: '03-02',
                url: '/home',
                level: '2',
            }
        ]
    }
]

export default menuData;