///<reference path="./define.js">

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

function insert2BiTree() {
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
 * 创建红黑树
 */
function generateRBTree(random = false) {
  root = null;
  insert2RBTree(random);
}

/**
 * 红黑树插入
 */
function insert2RBTree(random) {
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
function removeFromRBTree() {
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
function RBTreeInsert(node, value) {
  if (node == null) {
    return new Node(value);
  }
  if (value < node.value) {
    node.left = RBTreeInsert(node.left, value);
    node.left.parent = node;
  } else if (value > node.value) {
    node.right = RBTreeInsert(node.right, value);
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
function RBTreeRemove(node, value) {
  if (node == null) {
    return;
  }
  if (value < node.value) {
    RBTreeRemove(node.left, value);
  } else if (value > node.value) {
    RBTreeRemove(node.right, value);
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
      RBTreeRemove(min, min.value);
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
  measure2(root, root.height);
  initCanvas();
  clear();
  render2(root, canvas.width / 2, 10 + radius, color);
}

var radius = 20;
// 兄弟节点间距
var spacing = 10;
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
// 1,2,3,4,null,5,null,null,6,null,null,7,null,null,null,null,null,null,8,null,null,null,null,9
// 1,2,3,null,5,6,null,null,null,null,11,12
// 1,2,null,4,5,null,null,8,9,10,11
// 1,2,3,4,5,null,7,8,9,10,11,null,null,null,12
// 1,2,3,4,5,6,7,8,9,10,11
// 1,2,null,3,null,null,null,4,5,null,null,null,null,null,null,null,null,6,7
// 极度不平衡树
// 1,2,3,4,5,null,null,6,7,8,9,null,null,null,null,10,11,12,13,14,15,16,17,null,null,null,null,null,null,null,null,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33
/**
 * 测量
 * @param node
 * @param height
 */
function measure2(node, height) {
  if (node == null) {
    return;
  }
  if (!node.left && !node.right) {
    node.isLinkedList = true;
    node.width = radius * 2;
    return;
  }

  measure2(node.left, height - 1);
  measure2(node.right, height - 1);

  // 记录该子树是否为单链表
  if (!node.left && !node.right) {
    node.isLinkedList = true;
  } else if (!node.right) {
    node.isLinkedList = node.left.isLinkedList;
  } else if (!node.left) {
    node.isLinkedList = node.right.isLinkedList;
  }

  // if (node.isLinkedList) {
  //   node.offset = spacing;
  //   node.width = (node.height - 1) * spacing * 2 + radius * 2;
  // } else {
  //   let leftWidth = getWidth(node.left);
  //   let rightWidth = getWidth(node.right);
  //   let childWidth = Math.max(rightWidth, leftWidth);
  //
  //   let mixWidth = Math.abs(leftWidth - rightWidth)/2;
  //
  //   node.width = childWidth * 2 + spacing - mixWidth;
  //   node.offset = childWidth / 2 + spacing/2 - mixWidth/2;
  // }

  let leftWidth = getWidth(node.left);
  let rightWidth = getWidth(node.right);
  let childWidth = Math.max(rightWidth, leftWidth);

  let mixWidth = Math.abs(leftWidth - rightWidth) / 2;

  // TODO
  node.width = childWidth * 2 - mixWidth;
  node.offset = childWidth / 2 - mixWidth / 2;
  // if (node.left && node.right) {
  //   node.width += spacing;
  //   node.offset += spacing / 2;
  // }
}

function measure(node, height) {
  if (node == null) {
    return;
  }
  if (!node.left && !node.right) {
    node.isLinkedList = true;
    node.width = radius * 2;
    return;
  }
  measure(node.left, height - 1);
  measure(node.right, height - 1);

  // 记录该子树是否为单链表
  if (!node.left && !node.right) {
    node.isLinkedList = true;
  } else if (!node.right) {
    node.isLinkedList = node.left.isLinkedList;
  } else if (!node.left) {
    node.isLinkedList = node.right.isLinkedList;
  }

  // if (node.isLinkedList) {
  //   node.offset = spacing;
  //   node.width = (node.height - 1) * spacing * 2 + radius * 2;
  // } else {
  //   let childWidth = Math.max(getWidth(node.left), getWidth(node.right));
  //   node.width = childWidth * 2 + spacing;
  //   node.offset = childWidth / 2 + spacing/2;
  //   // node.width = childWidth * 2;
  //   // node.offset = childWidth / 2;
  //   // if (isLeaf(node.left) && isLeaf(node.right)) {
  //   //   node.width += spacing;
  //   //   node.offset += spacing / 2;
  //   // }
  // }
  let childWidth = Math.max(getWidth(node.left), getWidth(node.right));
  node.width = childWidth * 2;
  node.offset = childWidth / 2;
}

function getWidth(node) {
  return node ? node.width : 0;
}

function isLeaf(node) {
  return !node.left && !node.right;
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

function layout(node) {
  if (node == null) {
    return;
  }
  layout(node.left);
  layout(node.right);
  // 左右子树应该偏移的距离
  let leftOffset, rightOffset;
  if (node.left) {
    // 左子树的最右边到根节点的距离
    let ll = 0, lr = 0;
    if (node.left.right) {
      lr = node.left.right.width;
    }
    if (node.left.left) {
      ll = node.left.left.width;
    }
  }
}


function render2(node, x, y, color = false) {
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
    render2(node.left, lx, ly, color);
  }
  if (node.right != null) {
    let offset = node.right.width / 2;
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

/**
 * 生成一颗随机二叉树
 */
function randomBiTree() {
  let count = 500;
  array = new Array(count)
  for (let i = 0; i < count; i++) {
    let seed = Math.round(Math.random() * 2);
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
  let count = 200;
  array = new Array(count);
  let set = new Set();
  while (set.size < count) {
    let num = Math.round(Math.random() * 500 + 1);
    set.add(num);
  }
  let idx = 0;
  for (let x of set) {
    array[idx] = x;
    idx++;
  }
  generateRBTree(true);
}

window.onload = randomRBTree


