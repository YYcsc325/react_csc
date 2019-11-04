/**
 * @name  getTreeNode
 * @param {*} ids
 * @param {*} id
 * @param {*} parentId
 */
export function getTreeNode(adTradeList, ids = [], id, parentId) {
  adTradeList.forEach(item => {
    if (item.key === id && item.level === '1') {
      ids.push(item.title);
    }
    if (item.key === id && item.level === '2') {
      ids.push(parentId);
      ids.push(item.title);
    }
    if (item.children && item.children.length) {
      getTreeNode(item.children, ids, id, item.title);
    }
  });
  return ids;
}
// result: [
//   {
//     title: '原生',
//     treePath: '/原生',
//     canSelect: false,
//     level: 1,
//     index: 0,
//     value: '200000',
//     children: [
//       {
//         title: '原生-IOT',
//         treePath: '/原生/原生-IOT',
//         canSelect: true,
//         level: 2,
//         index: 0,
//         value: '200100',
//         children: [],
//       },
//       {
//         title: '原生-红包码',
//         treePath: '/原生/原生-红包码',
//         canSelect: true,
//         level: 2,
//         index: 1,
//         value: '200200',
//         children: [],
//       },
//     ],
//   },
// ]