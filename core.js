// 输入数组
var array;

/**
 * 普通二叉树插入
 */
function insertBiTree() {
  let input = document.getElementById('input0')
  let array = input.value.split(',');
  array.forEach(v => this.array.push(v));
  generateBiTree();
}

/**
 * 创建一颗普通树
 */
function generateBiTree(random = false) {
  if (!random) {
    let input = document.getElementById('input0')
    array = input.value.split(',');
  }
  root = null;
  if (array.length > 0) {
    let num = parseInt(array[0]);
    if (!isNaN(num)) {
      root = new Node(num);
      BiTreeInsert(0, root);
    }
  }
  showTree();
}


// ===================== 排序树

function insertBSTree() {
  let input = document.getElementById('input1')
  let array = input.value.split(',');
  array.forEach(value => {
    let num = parseInt(value);
    if (!isNaN(num)) {
      root = BSTreeInsert(root, value);
    }
  });
  showTree();
}

function removeBSTree() {
  let input = document.getElementById('input1')
  let array = input.value.split(',');
  array.forEach(value => {
    let num = parseInt(value);
    if (!isNaN(num)) {
      root = BSTreeRemove(root, value);
    }
  });
  showTree();
}

function generateBSTree() {
  root = null;
  insertBSTree();
}

/**
 * 排序树转AVL
 */
function BST2AVL() {
  root = balanceNode(root);
  showTree();
}

function balanceNode(node) {
  if (node == null)
    return null;
  if (node.left != null) {
    node.left = balanceNode(node.left);
  }
  if (node.right != null) {
    node.right = balanceNode(node.right);
  }
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  return balanceSelf(node);
}


// ========================= AVL树


function insertAVL() {
  let input = document.getElementById('input2')
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      root = BSTreeInsert(root, num, true);
    }
  }
  showTree();
}

/**
 * 移除节点
 */
function removeAVL() {
  let input = document.getElementById('input2')
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      root = BSTreeRemove(root, num, true);
    }
  }
  showTree();
}


/**
 * 创建avl树
 */
function generateAVL() {
  root = null;
  insertAVL();
}


// ========================== 红黑树

/**
 * 创建红黑树
 */
function generateRBTree(random = false) {
  root = null;
  insertRBTree(random);
}

/**
 * 红黑树插入
 */
function insertRBTree(random) {
  if (!random) {
    let input = document.getElementById('input3')
    array = input.value.split(',');
  }
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      root = RBTreeInsert(root, num);
      root.color = BLACK;
    }
  }
  showTree(true);
}

/**
 * 红黑树插入
 */
function removeRBTree() {
  let input = document.getElementById('input3')
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      if (root == null || (root.left == null && root.right == null)) {
        root = null;
        break;
      } else {
        RBTreeRemove(root, num);
      }
    }
  }
  showTree(true);
}


// =============== 渲染

/**
 * 渲染
 */
function showTree(color = false) {
  measure(root);
  initCanvas();
  clear();
  render(root, canvas.width / 2, 10 + radius, color);
}

// 节点半径
var radius = 20;
// 兄弟节点间距
var spacing = 20;
// 每层间距，父节点到子节点圆心距离
var height = radius * 3;
// 画布留白
var padding = 20;

var root = null;
var canvas = null;
var ctx = null;

/***
 * 重新设置画布大小
 */
function initCanvas() {
  canvas = document.getElementById('canvas');
  // const h = getHeight(root);
  // let leaf = Math.pow(2, h - 1);
  const cvHeight = (root.height - 1) * height + radius * 2 + padding * 2;
  const cvWidth = root.width + padding * 2;
  canvas.style.height = cvHeight + 'px';
  canvas.style.width = cvWidth + 'px';
  canvas.height = cvHeight;
  canvas.width = cvWidth;
  ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'red';
  ctx.font = 'bold ' + 20 + 'px serif';
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// 1,2,null,3,null,null,null,4,null,null,null,null,null,null,null,5
// 1,2,3,null,4,5,6,null,null,null,7,8,9
// 1,2,3,4,null,5,null,null,6,null,null,7,null,null,null,null,null,null,8,null,null,null,null,9
// 1,2,3,null,5,6,null,null,null,null,11,12
// 1,2,null,4,5,null,null,8,9,10,11
// 1,2,3,4,5,null,7,8,9,10,11,null,null,null,12
// 1,2,3,4,5,6,7,8,9,10,11
// 1,2,null,3,null,null,null,4,5,null,null,null,null,null,null,null,null,6,7
// 极度不平衡树
// 1,2,3,4,5,null,null,6,7,8,9,null,null,null,null,10,11,12,13,14,15,16,17,null,null,null,null,null,null,null,null,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33

let mixTotal = 0;

/**
 * 测量
 * @param node
 * @param height
 */
function measure(node) {
  mixTotal = 0;
  if (node == null) {
    return;
  }
  if (!node.left && !node.right) {
    node.isLinkedList = true;
    node.width = radius * 2;
    return;
  }
  measure(node.left);
  measure(node.right);

  // // 记录该子树是否为单链表
  // if (!node.left && !node.right) {
  //   node.isLinkedList = true;
  // } else if (!node.right) {
  //   node.isLinkedList = node.left.isLinkedList;
  // } else if (!node.left) {
  //   node.isLinkedList = node.right.isLinkedList;
  // }

  let leftWidth = getWidth(node.left);
  let rightWidth = getWidth(node.right);

  if (!node.left || !node.right) {
    // 一边子树为空时丢弃空子树空白空间
    node.width = leftWidth + rightWidth;
  } else {
    // 左右子树宽度
    let leftWidth = getWidth(node.left);
    let rightWidth = getWidth(node.right);
    // 当前为满二叉树时子树应该占据的空间
    let childSpace = Math.max(rightWidth, leftWidth);
    // 左右子树高度不相等时，允许它们有一部分空白空间重合，更加紧凑
    let mixWidth = Math.abs(leftWidth - rightWidth) / 2;
    mixTotal += mixWidth;
    node.width = childSpace * 2 - mixWidth;
    node.offset = childSpace / 2 - mixWidth / 2;
  }
  // 兄弟节点加间距
  node.width += spacing;
  node.offset += spacing / 2;
}

function getWidth(node) {
  return node ? node.width : 0;
}


/**
 * 该子树是否为单链表
 * @param node
 * @returns {boolean}
 */
function isLinkedList(node) {
  let factor = Math.abs(getHeight(node.left) - getHeight(node.right));
  if (factor === node.height - 1) {
    return true;
  }
}


function render(node, x, y, color = false) {
  if (node == null) {
    return;
  }
  if (node.left != null) {
    let offset = node.left.width / 2;
    let lx = x - node.offset;
    let ly = y + height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(lx, ly);
    ctx.stroke();
    render(node.left, lx, ly, color);
  }
  if (node.right != null) {
    let offset = node.right.width / 2;
    let rx = x + node.offset;
    let ry = y + height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(rx, ry);
    ctx.stroke();
    render(node.right, rx, ry, color);
  }
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.closePath();
  if (color) {
    ctx.fillStyle = node.color === RED ? 'red' : 'black';
    ctx.fill('nonzero');
    ctx.fillStyle = 'white';
  } else {
    ctx.fillStyle = 'white';
    ctx.fill('nonzero');
    ctx.fillStyle = 'red';
  }
  ctx.stroke();
  // 最大叶子节点数，即最后一层可容纳的最大节点数2^h-1
  // ctx.fillStyle = RED;
  ctx.fillText(node.value.toString(), x, y);
}

/**
 * 生成一颗随机二叉树
 */
function randomBiTree() {
  let count = 200;
  array = new Array(count);
  array[0] = 1;
  for (let i = 1; i < count; i++) {
    let seed = Math.round(Math.random() * 4);
    if (seed) {
      array[i] = i;
    } else {
      array[i] = "null";
    }
  }
  generateBiTree(true);
}

/**
 * 生成一颗随机红黑树
 */
function randomRBTree() {
  let count = 100;
  array = new Array(count);
  let set = new Set();
  while (set.size < count) {
    let num = Math.round(Math.random() * 500 + 1);
    set.add(num);
  }
  let idx = 0;
  set.forEach(value => {
    array[idx] = value;
    idx++;
  });
  generateRBTree(true);
}

