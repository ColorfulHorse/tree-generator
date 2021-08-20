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


  root2 = null;
  if (array.length > 0) {
    let num = parseInt(array[0]);
    if (!isNaN(num)) {
      root2 = new Node(num);
      BiTreeInsert(array, 0, root2);
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
  generateBiTree(true);
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
      let isRB = isRBTree(root);
      if (!isRB) {
        console.log("insert value:" + num + "====isRB:"+isRB);
      }
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
        let isRB = isRBTree(root);
        if (!isRB) {
          console.log("remove value:" + num + "====isRB:"+isRB);
        }
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

  // measure2(root2);
  // if (root2.height >= 7) {
  //   // console.log("height:"+root.height+"====mixTotal:"+mixTotal);
  // }
  // initCanvas2();
  // clear2();
  // render2(root2, canvas2.width / 2, 10 + radius, color);
  // console.log("measure3 width:" + root.width + "=======measure width:" + root2.width);
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
var root2 = null;

// var canvas = null;
var ctx = null;
var ctx2 = null;

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
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold ' + 20 + 'px serif';
}

function initCanvas2(canvas) {
  canvas2 = document.getElementById('canvas2');
  // const h = getHeight(root);
  // let leaf = Math.pow(2, h - 1);
  const cvHeight = (root2.height - 1) * height + radius * 2 + padding * 2;
  const cvWidth = root2.width + padding * 2;
  canvas2.style.height = cvHeight + 'px';
  canvas2.style.width = cvWidth + 'px';
  canvas2.height = cvHeight;
  canvas2.width = cvWidth;
  ctx2 = canvas2.getContext('2d');
  ctx2.strokeStyle = '#000';
  ctx2.textAlign = 'center';
  ctx2.textBaseline = 'middle';
  ctx2.font = 'bold ' + 20 + 'px serif';
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clear2(ctx, canvas) {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
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

// 缩减空间
let mixTotal = 0;

/**
 * 测量
 * @param node
 * @param height
 */
function measure2(node) {
  mixTotal = 0;
  if (node == null) {
    return;
  }
  if (!node.left && !node.right) {
    node.isLinkedList = true;
    node.width = radius * 2;
    return;
  }

  // TODO 此树过多冗余空间 1,2,3,4,,,,6,7,,,,,,,10,11,12,13,,,,,,,,,,,,,18,19,20,21,22,23,24,25
  // TODO 对比 leetcode [1,2,3,4,null,null,null,6,7,10,11,12,13,18,19,20,21,22,23,24,25]
  measure2(node.left);
  measure2(node.right);

  // 记录该子树是否为单链表
  if (!node.left && !node.right) {
    node.isLinkedList = true;
  } else if (!node.right) {
    node.isLinkedList = node.left.isLinkedList;
  } else if (!node.left) {
    node.isLinkedList = node.right.isLinkedList;
  }

  let leftWidth = getWidth(node.left);
  let rightWidth = getWidth(node.right);

  if (!node.left || !node.right) {
    node.width = leftWidth + rightWidth;
    // node.offset = spacing/2;
  } else {
    // 当前为满二叉树时子树应该占据的空间
    let childSpace = Math.max(rightWidth, leftWidth);
    // 左右子树高度不相等时，允许它们有一部分空白空间重合，更加紧凑
    let mixWidth = Math.abs(leftWidth - rightWidth) / 2;
    // if (isLeaf(node.left) || isLeaf(node.right)){
    //   mixWidth*=2;
    // }
    // console.log("mix width:"+mixWidth);
    node.width = childSpace * 2 - mixWidth;
    node.offset = childSpace / 2 - mixWidth / 2;
  }
  // node.width += spacing;
  // node.offset += spacing / 2;
}


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
  // TODO 此树过多冗余空间 1,2,3,4,,,,6,7,,,,,,,10,11,12,13,,,,,,,,,,,,,18,19,20,21,22,23,24,25
  // TODO 对比 leetcode [1,2,3,4,null,null,null,6,7,10,11,12,13,18,19,20,21,22,23,24,25]
  measure(node.left);
  measure(node.right);

  // 记录该子树是否为单链表
  // if (!node.right) {
  //   node.isLinkedList = node.left.isLinkedList;
  // } else if (!node.left) {
  //   node.isLinkedList = node.right.isLinkedList;
  // }

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
      // console.log("node value: " + node.value + "  distance:" + distance + "  fixWidth:" + fix);
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

function render2(node, x, y, color = false) {
  if (node == null) {
    return;
  }
  if (node.left != null) {
    let offset = node.left.width / 2;
    let lx = x - node.offset;
    let ly = y + height;
    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.lineTo(lx, ly);
    ctx2.stroke();
    render2(node.left, lx, ly, color);
  }
  if (node.right != null) {
    let offset = node.right.width / 2;
    let rx = x + node.offset;
    let ry = y + height;
    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.lineTo(rx, ry);
    ctx2.stroke();
    render2(node.right, rx, ry, color);
  }
  ctx2.beginPath();
  ctx2.arc(x, y, radius, 0, 2 * Math.PI)
  ctx2.closePath();
  if (color) {
    ctx2.fillStyle = node.color === RED ? 'red' : 'black';
    ctx2.fill('nonzero');
    ctx2.fillStyle = 'white';
  } else {
    ctx2.fillStyle = 'white';
    ctx2.fill('nonzero');
    ctx2.fillStyle = 'red';
  }
  ctx2.stroke();
  ctx2.fillText(node.value.toString(), x, y);
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
  // 1,1,2,3,4,5,6,null,null,9,10,null,12,13,14,15,16,17,18,null,20,21,22,23,24,null,26,27,28,29,30,null,32,33,34,35,36,37,null,39,40,41,42,43,44,45,46,47,48,49,50,null,52,53,54,55,56,57,58,59,60,61,null,63,64,null,null,67,68,69,70,71,72,73,74,75,76,77,78,79,null,81,82,null,84,85,86,87,88,89,90,null,92,null,94,95,96,97,98,null,null,101,102,103,104,105,null,null,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,null,135,136,137,null,139,140,141,142,143,144,145,146,147,148,149,150,null,152,153,154,155,156,157,158,159,160,161,162,163,164,165,null,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,null,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,null,214,215,null,217,null,219,220,221,null,223,224,225,226,227,null,229,230,231,232,233,234,null,null,237,238,239,240,241,242,null,244,245,246,247,248,249,null,251,null,null,254,null,null,257,258,259,260,null,262,263,264,265,null,267,268,269,null,null,null,null,null,275,276,277,278,279,280,281,282,null,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299
  let input = document.getElementById('inputBiTree');
  input.value = array.toString();
  generateBiTree();
}

function randomSet() {
  let count = 100;
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
