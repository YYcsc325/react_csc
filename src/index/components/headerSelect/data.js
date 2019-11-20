const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const dataArr = [
    {
      value:'第一个数据',
      name:'firstOne',
      children:[
        {
          name:'cfirstOne',
          value:'第一子数据1'
        },{
          name:'cfirstTwo',
          value:'第一子数据2'
        },{
          name:'cfirstThree',
          value:'第一子数据3'
        }
      ],
      id:'1',
    },{
      value:'第二个数据',
      name:'secondTwo',
      children:[
        {
          name:'csecondOne',
          value:'第二个子数据1',
        },{
          name:'csecondTwo',
          value:'第二个子数据2'
        },{
          name:'csecondThree',
          value:'第二个子数据3'
        }
      ],
      id:'2',
    },{
      value:'第三个数据',
      name:'thirdThree',
      children:[
        {
          name:'cthirdOne',
          value:'第三个子数据1'
        },{
          name:'cthirdTwo',
          value:'第三个子数据2',
        },{
          name:'cthirdThree',
          value:'第三个子数据3'
        }
      ],
      id:'3'
    }
  ]
  export {
    dataSource,
    columns,
    dataArr
  }