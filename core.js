// 输入数组
var array;

/**
 * 创建一颗普通树
 */
function generateBiTree() {
  let input = document.getElementById('inputBiTree');
  array = input.value.split(',');

  root = null;
  if (array.length > 0) {
    let num = parseInt(array[0]);
    if (!isNaN(num)) {
      root = new Node(num);
      BiTreeInsert(array, 0, root);
    }
  }
  showTree();
}

/**
 * 普通二叉树插入
 */
function insertBiTree() {
  if (!this.array) {
    this.array = [];
  }
  let input = document.getElementById('inputBiTree');
  let array = input.value.split(',');
  array.forEach(v => this.array.push(v));
  generateBiTree();
}


// ===================== 排序树

function generateBSTree() {
  root = null;
  insertBSTree();
}

function insertBSTree() {
  let input = document.getElementById('inputBST');
  array = input.value.split(',');

  array.forEach(value => {
    let num = parseInt(value);
    if (!isNaN(num)) {
      root = BSTreeInsert(root, num);
    }
  });
  showTree();
}

function removeBSTree() {
  let input = document.getElementById('inputBST');
  let array = input.value.split(',');
  array.forEach(value => {
    let num = parseInt(value);
    if (!isNaN(num)) {
      root = BSTreeRemove(root, num);
    }
  });
  showTree();
}

/**
 * 排序树转AVL
 */
function BST2AVL() {
  root = balanceNode(root);
  showTree();
}

/**
 * 自底向上平衡二叉树，单次可能无法完全平衡
 * @param node
 * @returns {null|*}
 */
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


/**
 * 创建avl树
 */
function generateAVL() {
  root = null;
  insertAVL();
}

function insertAVL() {
  let input = document.getElementById('inputAVL');
  array = input.value.split(',');

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
  let input = document.getElementById('inputAVL');
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      root = BSTreeRemove(root, num, true);
    }
  }
  showTree();
}


// ========================== 红黑树

/**
 * 创建红黑树
 */
function generateRBTree() {
  root = null;
  insertRBTree();
}

/**
 * 红黑树插入
 */
function insertRBTree() {
  let input = document.getElementById('inputRBT');
  array = input.value.split(',');

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
  let input = document.getElementById('inputRBT');
  let array = input.value.split(',');
  for (let i = 0; i < array.length; i++) {
    let num = parseInt(array[i]);
    if (!isNaN(num)) {
      if (root == null || (root.left == null && root.right == null)) {
        root = null;
        break;
      } else {
        RBTreeRemove(root, num);
        root = getRoot(root);
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
var height = radius * 2 + 30;
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
  const cvHeight = (root.height - 1) * height + radius * 2 + padding * 2;
  const cvWidth = root.width + padding * 2;
  canvas.style.height = cvHeight + 'px';
  canvas.style.width = cvWidth + 'px';
  canvas.height = cvHeight;
  canvas.width = cvWidth;
  ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold ' + 20 + 'px serif';
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * 自底向上测量整个树宽度以及各节点位置
 * @param node
 */
function measure(node) {
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

  // 左右子树宽度
  let leftWidth = getWidth(node.left);
  let rightWidth = getWidth(node.right);

  let fixNode = null;
  if (!node.left || !node.right) {
    node.width = leftWidth + rightWidth;
    node.width += spacing;
    node.offset = spacing / 2;
  } else {
    // 当前为满二叉树时子树应该占据的空间
    let childSpace = Math.max(rightWidth, leftWidth);
    let factor = getHeight(node.left) - getHeight(node.right);
    node.width = childSpace * 2;
    node.offset = childSpace / 2;
    // 宽度比较小子树的边缘到当前树中线的空隙间距，这部分空白可以去掉
    let mixWidth = Math.abs(leftWidth - rightWidth) / 2;
    if (factor > 0) {
      if (leftWidth >= rightWidth) {
        // 较高的子树宽度大于较低的子树时，可以使它们进一步靠近缩减空间
        let div = Math.pow(2, getHeight(node.right));
        let leftSpace = leftWidth / div - radius;
        if (leftSpace < 0) {
          leftSpace = 0;
        }
        mixWidth += leftSpace;
        fixNode = node.left;
      }
    } else if (factor < 0) {
      if (rightWidth >= leftWidth) {
        let div = Math.pow(2, getHeight(node.left));
        let rightSpace = rightWidth / div - radius;
        if (rightSpace < 0) {
          rightSpace = 0;
        }
        mixWidth += rightSpace;
        fixNode = node.right;
      }
    }
    console.log("mixWidth: " + mixWidth);
    node.width -= mixWidth;
    node.offset -= mixWidth / 2;
    // 节点之间添加空隙
    node.width += spacing;
    node.offset += spacing / 2;
    // 左右子节点圆心距离
    let distance = childSpace - mixWidth + spacing;
    if (fixNode) {
      let fix = fixWidth(fixNode.offset, distance);
      node.width += fix;
      node.offset += fix / 2;
    }
  }
}

/**
 * 修复连接线和节点重合问题
 * @param offset 子树N圆心到其下一层子树NChild圆心的距离
 * @param distance 子树N圆心到其兄弟节点NBrother圆心的距离
 * @returns {number}
 */
function fixWidth(offset, distance) {
  // 这里通过判断夹角是否比切线夹角小确定是否有连接线和节点重叠
  if (Math.atan(height / offset) < Math.asin(radius / distance)) {
    // let sin = radius / (x + distance);
    // let tan = height / (x + f);
    // tan = sin/sqrt(1-sin^2)
    let sR = radius * radius;
    let sF = offset * offset;
    let sD = distance * distance;
    let sH = height * height;
    // 一元二次方程求根
    let a = sR - sH;
    let b = 2 * (sR * offset - sH * distance);
    let c = sH * sR + sR * sF - sH * sD;
    let res = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    let res2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    return res >= 0 ? res : res2;
  }
  return 0;
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

/**
 * 绘制树
 * @param node
 * @param x
 * @param y
 * @param color
 */
function render(node, x, y, color = false) {
  if (node == null) {
    return;
  }
  if (node.left != null) {
    let lx = x - node.offset;
    let ly = y + height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(lx, ly);
    ctx.stroke();
    render(node.left, lx, ly, color);
  }
  if (node.right != null) {
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
  ctx.fillText(node.value.toString(), x, y);
}

/**
 * 生成一颗随机二叉树
 */
function randomBiTree() {
  let count = 200;
  let array = new Array(count);
  array[0] = 1;
  for (let i = 1; i < count; i++) {
    let seed = Math.round(Math.random() * 4);
    if (seed) {
      array[i] = i;
    } else {
      array[i] = "null";
    }
  }
  let input = document.getElementById('inputBiTree');
  input.value = array.toString();
  generateBiTree();
}

function randomSet() {
  let count = 50;
  let array = new Array(count);
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
  return array;
}

/**
 * 生成一颗随机排序树
 */
function randomBSTree() {
  let input = document.getElementById('inputBST');
  input.value = randomSet().toString();
  generateBSTree();
}

/**
 * 生成一颗随机AVL树
 */
function randomAVLTree() {
  let input = document.getElementById('inputAVL');
  input.value = randomSet().toString();
  generateAVL();
}

/**
 * 生成一颗随机红黑树
 */
function randomRBTree() {
  let input = document.getElementById('inputRBT');
  input.value = randomSet().toString();
  generateRBTree();
}
