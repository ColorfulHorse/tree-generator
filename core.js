const RED = 0;
const BLACK = 1;

function Node(value) {
  this.height = 1;
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.color = RED;

  this.width = 0;
  // 根节点到最右边节点
  this.leftWidth = 0;
  this.rightWidth = 0;
  this.offset = radius;
}


function getHeight(node) {
  return node == null ? 0 : node.height;
}

// ================= 通用

/**
 * 插入节点
 * @param node
 * @param value
 * @param selfBalance
 * @returns {Node|*}
 */
function insert(node, value, selfBalance) {
  if (node == null) {
    return new Node(value);
  }
  if (value < node.value) {
    node.left = insert(node.left, value, selfBalance);
  } else if (value > node.value) {
    node.right = insert(node.right, value, selfBalance);
  }
  // 重新计算高度，递归自底向上
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  if (selfBalance) {
    node = balanceSelf(node)
  }
  return node;
}

function remove(node, value, selfBalance) {
  if (node == null) {
    return null;
  }
  if (value < node.value) {
    node.left = remove(node.left, value, selfBalance);
  } else if (value > node.value) {
    node.right = remove(node.right, value, selfBalance);
  } else {
    if (node.left == null && node.right == null) {
      return null;
    } else if (node.left == null) {
      node = node.right;
    } else if (node.right == null) {
      node = node.left;
    } else {
      // 左右子节点都不为空，找到右子节点的最小叶子节点
      let min = getMin(node.right);
      let right = remove(node.right, min.value, selfBalance);
      min.left = node.left;
      min.right = right;
      node.left = node.right = null;
      node = min;
    }
  }
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  if (selfBalance) {
    node = balanceSelf(node)
  }
  return node;
}

// 输入数组
var array;

/**
 * 右旋
 * @param node
 * @returns {*}
 */
function rightRotate(node) {
  //2,3,4,5,8,9,13
  let res = node.left;
  node.left = res.right;
  if (node.left != null) {
    node.left.parent = node;
  }
  res.right = node;
  res.right.parent = res;
  res.parent = null;
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  res.height = Math.max(getHeight(res.left), getHeight(res.right)) + 1;
  return res;
}

/**
 * 左旋
 * @param node
 * @returns {*}
 */
function leftRotate(node) {
  let res = node.right;
  node.right = res.left;
  if (node.right != null) {
    node.right.parent = node;
  }
  res.left = node;
  res.left.parent = res;
  res.parent = null;
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  res.height = Math.max(getHeight(res.left), getHeight(res.right)) + 1;
  return res;
}

function getMin(node) {
  if (node == null || node.left == null) {
    return node;
  }
  return getMin(node.left);
}


// =================== 普通二叉树

/**
 * 创建二叉树
 */
function createBTree() {
  let input = document.getElementById('input0')
  array = input.value.split(',');
  generateTree();
}

function insertBTree() {
  let input = document.getElementById('input0')
  let array = input.value.split(',');
  array.forEach(v => this.array.push(v));
  generateTree();
}

/**
 * 创建一颗普通树
 */
function generateTree() {
  root = null;
  if (array.length > 0) {
    let num = parseInt(array[0]);
    if (!isNaN(num)) {
      root = new Node(array[0]);
      insertBiTree(0, root);
    }
    // root = generate()
  }
  showTree();
}

/**
 * 二叉树插入节点
 * @param index
 * @param node
 */
function insertBiTree(index, node) {
  let leftIndex = index * 2 + 1;
  let rightIndex = leftIndex + 1;
  let num;
  if (leftIndex >= array.length)
    return
  num = parseInt(array[leftIndex]);
  if (!isNaN(num)) {
    let left = new Node(num);
    node.left = left;
    insertBiTree(leftIndex, left);
  }

  if (leftIndex >= array.length)
    return
  num = parseInt(array[rightIndex]);
  if (!isNaN(num)) {
    let right = new Node(num);
    node.right = right;
    insertBiTree(rightIndex, right);
  }
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function generate() {
  let nodes = new Array(array.length);
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      nodes[i] = new Node(num);
    }
  }
  for (let i = 0; i < array.length / 2 - 1; i++) {
    let leftIndex = i * 2 + 1;
    let rightIndex = leftIndex + 1;
    let node = nodes[i];
    if (node) {
      node.left = nodes[leftIndex];
      node.right = nodes[rightIndex];
    }
  }
  // 判断最后一个根结点：因为最后一个根结点可能没有右结点，所以单独拿出来处理
  let lastIndex = array.length / 2 - 1;
  let lastNode = nodes[lastIndex];
  if (lastNode) {
    // 左结点
    lastNode.left = nodes[lastIndex * 2 + 1];
    // 右结点，如果数组的长度为奇数才有右结点
    if (array.length % 2 === 1) {
      lastNode.right = nodes[lastIndex * 2 + 2];
    }
  }
  return nodes[0]
}


// ===================== 排序树

/**
 * 平衡因子
 * @param node
 * @returns {number}
 */
function getBalanceFactor(node) {
  let lh = getHeight(node.left);
  let rh = getHeight(node.right);
  return lh - rh;
}

/**
 * 排序树自平衡
 * @param node
 * @returns {*}
 */
function balanceSelf(node) {
  if (getBalanceFactor(node) > 1 && getBalanceFactor(node.left) >= 0) {
    // LL  右旋
    node = rightRotate(node);
  }
  if (getBalanceFactor(node) < -1 && getBalanceFactor(node.right) <= 0) {
    // RR
    node = leftRotate(node);
  }
  if (getBalanceFactor(node) > 1 && getBalanceFactor(node.left) < 0) {
    // LR 左旋左子树，然后右旋本身
    node.left = leftRotate(node.left);
    node = rightRotate(node);
  }
  if (getBalanceFactor(node) < -1 && getBalanceFactor(node.right) > 0) {
    // RL
    node.right = rightRotate(node.right);
    node = leftRotate(node);
  }
  return node
}


function insertBST() {
  let input = document.getElementById('input1')
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      root = insert(root, num);
    }
  }
  showTree();
}

function removeBTS() {
  let input = document.getElementById('input1')
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      root = remove(root, num);
    }
  }
  showTree();
}

function createBST() {
  root = null;
  insertBST();
}

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
      root = insert(root, num, true);
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
      root = remove(root, num, true);
    }
  }
  showTree();
}


/**
 * 创建avl树
 */
function createAVL() {
  root = null;
  insertAVL();
}


// ========================== 红黑树

/**
 * 红黑树插入
 */
function insertRBT() {
  let input = document.getElementById('input3')
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      root = RBTInsert(root, num);
      root.color = BLACK;
    }
  }
  showTree(true);
}

/**
 * 红黑树插入
 */
function removeRBT() {
  let input = document.getElementById('input3')
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      if (root == null || (root.left == null && root.right == null)) {
        root = null;
        break;
      } else {
        RBTRemove(root, num);
      }
    }
  }
  showTree(true);
}

/**
 * 创建红黑树
 */
function createRBT() {
  root = null;
  insertRBT();
}

function isRed(node) {
  if (node == null)
    return false;
  return node.color === RED;
}

/**
 * 红黑树插入节点
 * @param node
 * @param value
 * @returns {Node|*}
 * @constructor
 */
function RBTInsert(node, value) {
  if (node == null) {
    return new Node(value);
  }
  if (value < node.value) {
    node.left = RBTInsert(node.left, value);
    node.left.parent = node;
  } else if (value > node.value) {
    node.right = RBTInsert(node.right, value);
    node.right.parent = node;
  }
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  if (isRed(node.left) && isRed(node.right)) {
    // 插入节点的父节点为红色，父节点的兄弟节点也为红色，
    // 也就是 祖父节点->父节点->插入节点 = 黑->红->红，将三层颜色变为 红->黑->红 即可
    if (isRed(node.left.left) || isRed(node.left.right) || isRed(node.right.right) || isRed(node.right.left)) {
      node.left.color = BLACK;
      node.right.color = BLACK;
      node.color = RED;
    }
  } else if (isRed(node.left)) {
    // 插入节点的父节点为红色，父节点的兄弟节点为黑色
    if (isRed(node.left.left)) {
      // LL
      // 右旋祖父节点
      node.color = RED;
      node.left.color = BLACK;
      node = rightRotate(node);
    } else if (isRed(node.left.right)) {
      // LR
      node.left = leftRotate(node.left);
      node.color = RED;
      node.left.color = BLACK;
      node = rightRotate(node);
    }
  } else if (isRed(node.right)) {
    if (isRed(node.right.right)) {
      // RR
      node.color = RED;
      node.right.color = BLACK;
      node = leftRotate(node);
    } else if (isRed(node.right.left)) {
      // RL
      node.right = rightRotate(node.right);
      node.color = RED;
      node.right.color = BLACK;
      node = leftRotate(node);
    }
  }
  return node;
}


/**
 * @param node
 * @param value
 * @returns {null|*}
 * @constructor
 */
function RBTRemove(node, value) {
  if (node == null) {
    return;
  }
  if (value < node.value) {
    RBTRemove(node.left, value);
  } else if (value > node.value) {
    RBTRemove(node.right, value);
  } else {
    // 该节点为要删除的节点
    if (node.left == null && node.right == null) {
      // 删除节点没有子节点
      let last = fixRBNode(node);
      last.color = BLACK;
      // 修复完成后再删除节点
      if (node.parent.left === node) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      node.parent = null;
    } else if (node.left == null || node.right == null) {
      // 如果删除节点有一个子节点，那么删除节点必然为黑色，子节点必然为红（红节点必有两个黑子节点），删除本节点相当于删除它的红色子节点
      //       -
      //     /    \
      //  del(黑)  -
      //   /      / \
      //  红      -   -
      let child = node.left == null ? node.right : node.left;
      let value = child.value;
      if (node.left === child) {
        node.left = null;
      } else {
        node.right = null;
      }
      child.parent = null;
      // RBTRemove(child, child.value);
      node.value = value;
    } else {
      // 删除节点有两个子节点，找到右子节点的最小叶子节点（后继）
      //       -
      //     /    \
      //   del     -
      //   / \    / \
      //  -   -  -   -
      //     /
      //    -  <- 相当于删除这个节点
      let min = getMin(node.right);
      let value = min.value;
      RBTRemove(min, min.value);
      node.value = value;
    }
  }
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function fixRBNode(node) {
  let parent = node.parent;
  if (parent == null) {
    return node;
  }
  let grand = node.parent.parent;
  let brother;
  // 删除节点的左右子节点都为空，红节点直接删除，黑节点需平衡
  if (node.color === BLACK) {
    if (node.value < parent.value) {
      // 删除节点为父节点的左子节点
      brother = parent.right;
      if (isRed(brother)) {
        // 兄弟节点为红色，则父节点为黑节点，兄弟节点有两个黑节点
        //      黑           黑              黑           黑
        //     / \          / \   左旋      / \          / \
        //   del 红   =>  del 黑    =>     黑  黑   =>   黑  黑
        //      / \          / \         / \            \
        //     黑  黑        红  黑      del 红           红
        brother.color = BLACK;
        brother.left.color = RED;
        parent = leftRotate(parent);
        linkParent(parent, grand);
      } else {
        // 删除节点的兄弟节点为黑色，此时若兄弟节点有子节点，子节点都为红
        if (brother.left == null && brother.right == null) {
          // 兄弟节点无子节点，向上回溯
          //    红/黑        红/黑  <- 指定为新的平衡点
          //     /\    =>    / \
          //   del 黑       del 红
          brother.color = RED;
          return fixRBNode(parent);
        } else if (brother.right == null) {
          // 兄弟节点的右节点为空，左子节点为红，即RL
          //    红/黑        红/黑            红/黑            黑           红/黑        红/黑
          //     /\          / \   右旋兄弟    / \           /  \           / \         / \
          //   del 黑   =>  del 红    =>     del 黑   =>   del 红/黑   =>   黑 黑   =>   黑 黑
          //      /            /                 \             \          /
          //     红            黑                 红             黑       del
          brother.left.color = BLACK;
          brother.color = RED;
          brother = rightRotate(brother);
          parent.right = brother;
          brother.parent = parent;
          brother.color = parent.color;
          parent.color = BLACK;
          brother.right.color = BLACK;
          parent = leftRotate(parent);
          linkParent(parent, grand);
        } else {
          // 兄弟节点的右节点为红，左节点为红或空，即RR
          //      红/黑            黑             红/黑           红/黑
          //       / \           /  \            /  \           /  \
          //      del 黑   =>   del 红/黑   =>   黑   黑   =>    黑   黑
          //         /  \           /  \      /   \             \
          //    红/null  红      红/null 黑   del 红/null       红/null
          brother.color = parent.color;
          // 父节点的颜色给到兄弟节点，父节点和兄弟节点的右子节点都变黑色，左旋
          parent.color = BLACK;
          brother.right.color = BLACK;
          parent = leftRotate(parent);
          linkParent(parent, grand);
        }
      }
    } else {
      // 删除节点为父节点的右子节点
      brother = parent.left;
      if (isRed(brother)) {
        // 兄弟节点为红色，则兄弟节点有两个黑节点
        brother.color = BLACK;
        brother.right.color = RED;
        parent = rightRotate(parent);
        linkParent(parent, grand);
      } else {
        // 删除节点的兄弟节点为黑色，此时若兄弟节点有子节点，子节点都为红
        if (brother.left == null && brother.right == null) {
          // 兄弟节点无子节点
          brother.color = RED;
          return fixRBNode(parent);
        } else if (brother.left == null) {
          // 兄弟节点的左节点为空，右子节点为红，即LR
          brother.right.color = BLACK;
          brother.color = RED;
          brother = leftRotate(brother);
          parent.left = brother;
          brother.parent = parent;
          brother.color = parent.color;
          parent.color = BLACK;
          brother.left.color = BLACK;
          parent = rightRotate(parent);
          linkParent(parent, grand);
        } else {
          // 兄弟节点的左节点为红，右节点为红或空，即LL
          brother.color = parent.color;
          // 父节点的颜色给到兄弟节点，父节点和兄弟节点的右子节点都变黑色，左旋
          parent.color = BLACK;
          brother.right.color = BLACK;
          parent = rightRotate(parent);
          linkParent(parent, grand);
        }
      }
    }
  }
  return node;
}

function linkParent(node, parent) {
  if (parent != null) {
    if (parent.left === node) {
      parent.left = node;
    } else {
      parent.right = node;
    }
    node.parent = parent;
  }
}


// =============== 渲染

/**
 * 渲染
 */
function showTree(color = false) {
  initCanvas();
  clear();
  measure2(root);
  render2(root, canvas.width / 2, 10 + radius, color);
}

var radius = 20;
// 兄弟节点间距
var spacing = radius;
// 每一层高度
var height = radius * 3;

var padding = 20;

var stage = null;
var root = null;
var canvas = null;
var ctx = null;

/***
 * 重新设置画布大小
 */
function initCanvas() {
  canvas = document.getElementById('canvas');
  const h = getHeight(root);
  let leaf = Math.pow(2, h - 1);
  const cvHeight = h * height + radius * 2 + padding * 2;
  const cvWidth = (leaf * 2 - 1) * radius * 2 + padding * 2;
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

function calOffset(node, offset) {
  if (node == null) {
    return 0;
  }
  let childOffset = radius;
  if (node.left && node.right) {
    childOffset *= 2;
  }

  if (node.left) {
    offset += calOffset(node.left, -childOffset)
  }
}

// 1,2,null,3,null,null,null,4,null,null,null,null,null,null,null,5
// 1,2,3,null,4,5,6,null,null,null,7,8,9
// 1,2,3,null,4,5,6,null,null,null,7,8
// 1,2,3,4,null,5,null,null,6,null,null,7,null,null,null,null,null,null,8,null,null,null,null,9
// 1,2,3,null,5,6,null,null,null,null,11,12
// 1,2,null,4,5,null,null,8,9,10,11
// 平衡宽度
function measure(node) {
  if (node == null) {
    return;
  }
  let width = radius * 2;
  if (!node.left && !node.right) {
    node.width = width;
    return;
  }
  // 左右子树宽度
  let leftWidth = 0;
  let rightWidth = 0;
  // 左子树应该偏移它右子树的宽度
  let leftOffset = radius;
  let rightOffset = radius;
  if (node.left) {
    measure(node.left);
    leftWidth = node.left.width;
    width -= radius;
    if (node.left.right) {
      // node.left.offset - radius表示lr子树根节点相对于
      leftOffset = node.left.right.width + node.left.offset - radius;
    }
  }
  if (node.right) {
    measure(node.right);
    rightWidth = node.right.width;
    width -= radius;
    if (node.right.left) {
      rightOffset = node.right.left.width + node.right.offset - radius;
    }
  }
  width += leftWidth + rightWidth;
  node.offset = Math.max(leftOffset, rightOffset);
  // 这里要加上由于偏移子树导致双亲扩大的width
  width += Math.abs(leftOffset - rightOffset);

  if (node.left && node.right) {
    // 两个兄弟节点的间隔
    width += spacing;
    node.offset += spacing / 2;
  }
  node.width = width;
}

function measure2(node) {
  if (node == null) {
    return 0;
  }
  // measure2(node.left, radius);
  // measure2(node.right, radius);
  // let addition = Math.max(measure2(node.left, radius), measure2(node.right, radius));
  node.offset += measure2(node.left, radius) + measure2(node.right, radius);
  // if (node.left) {
  //   node.left.offset += addition/2;
  // }
  // if (node.right) {
  //   node.right.offset += addition/2;
  // }
  if (node.left && node.right) {
    return radius;
  } else {
    return 0;
  }
}


function render2(node, x, y, color = false) {
  if (node == null) {
    return;
  }
  if (node.left != null) {
    let offset = node.left.width / 2 + node.offset;
    let lx = x - node.offset;
    let ly = y + height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(lx, ly);
    ctx.stroke();
    render2(node.left, lx, ly, color);
  }
  if (node.right != null) {
    let offset = node.right.width / 2 + node.offset;
    let rx = x + node.offset;
    let ry = y + height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(rx, ry);
    ctx.stroke();
    render2(node.right, rx, ry, color);
  }
  console.log("value:" + node.value + " x:" + (x - 160));
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

