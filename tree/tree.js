const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' }
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' }
  ],
}, {
  title: '0-2',
  key: '0-2',
}];
let data = []
function mapTree(treeData) {
  treeData.map(item => {
    data.push(item)
    if (item.children) {
      mapTree(item.children)
    }
  })
  return data
}
let res = mapTree(treeData)
let treeList = [
  { title: "0-0", key: "0-0", id: "0-0" },
  { title: "0-0-0", key: "0-0-0", parentId: "0-0", id: "0-0-0" },
  { title: "0-0-0-0", key: "0-0-0-0", parentId: "0-0-0", id: "0-0-0-0" },
  { title: "0-0-0-1", key: "0-0-0-1", parentId: "0-0-0", id: "0-0-0-1" },
  { title: "0-0-1", key: "0-0-1", parentId: "0-0", id: "0-0-1" },
  { title: "0-0-1-0", key: "0-0-1-0", parentId: "0-0-1", id: "0-0-1-0" },
  { title: "0-0-1-1", key: "0-0-1-1", parentId: "0-0-1", id: "0-0-1-1" },
  { title: "0-0-2", key: "0-0-2", parentId: "0-0", id: "0-0-2" },
  { title: "0-1", key: "0-1", id: "0-1" },
  { title: "0-1-0-0", key: "0-1-0-0", parentId: "0-1", id: "0-1-0-0" },
  { title: "0-1-0-1", key: "0-1-0-1", parentId: "0-1", id: "0-1-0-1" },
  { title: "0-2", key: "0-2", id: "0-2" }
]

//先将父节点取出，放进parentList
function getParent(tree) {
  let parentList = []
  tree.forEach(item => {
    if (!item.parentId) {
      let id = item.id
      let key = item.key
      let title = item.title
      let obj = { id, key, title }
      parentList.push(obj)
    }
  })
  console.log(tree, parentList)
  return converseTree(tree, parentList)
}


function converseTree(tree, parentList) {
  for (var i = 0; i < parentList.length; i++) {
    var parentItem = parentList[i]
    var childrenList = []
    var parentItemId = parentItem.id
    for (var j = 0; j < tree.length; j++) {
      var child = tree[j]
      var id = child.id
      var childObj = {
        id: id,
        title: child.title,
        key: child.key,
        parentId: child.parentId
      }
      if (childObj.parentId == parentItemId) {
        childrenList.push(childObj)
      }
    }
    parentItem.children = childrenList
    if (childrenList.length > 0) {
      converseTree(tree, childrenList)
    }
  }
  return parentList
}

let parent = getParent(treeList)
console.log(parent)