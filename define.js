const RED = 0;
const BLACK = 1;

function Node(value) {
  this.height = 1;
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
  // 红黑树节点颜色
  this.color = RED;

  // 绘制用
  this.width = 0;
  this.offset = 0;
}

function getHeight(node) {
  return node ? node.height : 0;
}

/**
 * 获取平衡因子
 * @param node
 * @returns {number}
 */
function getBalanceFactor(node) {
  let lh = getHeight(node.left);
  let rh = getHeight(node.right);
  return lh - rh;
}

/**
 * 获取排序树最小节点
 * @param node
 * @returns {*}
 */
function getBSTreeMin(node) {
  while (node.left) {
    node = node.left;
  }
  return node;
}

/**
 * 右旋
 * @param node
 * @returns {*}
 */
function rightRotate(node) {
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
  return node;
}


/**
 * 数组转二叉树
 * @param array
 * @param index 当前节点下标
 * @param node 当前节点
 */
function BiTreeInsert(array, index, node) {
  // 左右子节点下标
  let leftIndex = index * 2 + 1;
  let rightIndex = leftIndex + 1;
  let num;
  if (leftIndex >= array.length)
    return
  num = parseInt(array[leftIndex]);
  if (!isNaN(num)) {
    let left = new Node(num);
    node.left = left;
    BiTreeInsert(array, leftIndex, left);
  }

  if (leftIndex >= array.length)
    return
  num = parseInt(array[rightIndex]);
  if (!isNaN(num)) {
    let right = new Node(num);
    node.right = right;
    BiTreeInsert(array, rightIndex, right);
  }
  // 计算高度
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}


/**
 * 搜索树插入节点
 * @param node
 * @param value
 * @param selfBalance 自平衡为AVL
 * @returns {Node|*}
 */
function BSTreeInsert(node, value, selfBalance) {
  if (node == null) {
    return new Node(value);
  }
  if (value < node.value) {
    node.left = BSTreeInsert(node.left, value, selfBalance);
  } else if (value > node.value) {
    node.right = BSTreeInsert(node.right, value, selfBalance);
  }
  // 重新计算高度，递归自底向上
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  // AVL树平衡用
  if (selfBalance) {
    node = balanceSelf(node)
  }
  return node;
}

/**
 * 搜索树删除节点
 * @param node
 * @param value
 * @param selfBalance 自平衡为AVL
 * @returns {Node|*}
 */
function BSTreeRemove(node, value, selfBalance) {
  if (node == null) {
    return null;
  }
  if (value < node.value) {
    node.left = BSTreeRemove(node.left, value, selfBalance);
  } else if (value > node.value) {
    node.right = BSTreeRemove(node.right, value, selfBalance);
  } else {
    // 当前节点为待删除节点
    if (node.left == null && node.right == null) {
      return null;
    } else if (node.left == null || node.right == null) {
      return node.left == null ? node.right : node.left;
    } else {
      // 左右子节点都不为空，找到右子节点的最小子节点
      let min = getBSTreeMin(node.right);
      // 删除最小子节点
      node.right = BSTreeRemove(node.right, min.value, selfBalance);
      node.value = min.value;
    }
  }
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  if (selfBalance) {
    node = balanceSelf(node)
  }
  return node;
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
  // 将当前节点作为祖父节点检查是否需要自平衡操作
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
 * 红黑树删除节点
 * @param node
 * @param value
 * @returns {null|*}
 * @constructor
 */
function RBTreeRemove(node, value) {
  if (node == null) {
    return null;
  }
  if (value < node.value) {
    node.left = RBTreeRemove(node.left, value);
  } else if (value > node.value) {
    node.right = RBTreeRemove(node.right, value);
  } else {
    // 该节点为要删除的节点
    if (node.left == null && node.right == null) {
      // 删除节点没有子节点
      let last = fixRBNode(node);
      last.color = BLACK;
      // 修复完成后再删除节点
      // if (node.parent.left === node) {
      //   node.parent.left = null;
      // } else {
      //   node.parent.right = null;
      // }
      node.parent = null;
      return null;
    } else if (node.left == null || node.right == null) {
      // 如果删除节点有一个子节点，那么删除节点必然为黑色，子节点必然为红（红节点必有两个黑子节点）
      //       -
      //     /    \
      //  del(黑)  -
      //   /      / \
      //  红      -   -
      // 删除本节点相当于删除它的红色子节点
      let child = node.left == null ? node.right : node.left;
      // // 删除子节点
      // if (node.left === child) {
      //   node.left = null;
      // } else {
      //   node.right = null;
      // }
      node = RBTreeRemove(node, child.value);
      // 子节点值赋给当前节点
      node.value = child.value;
    } else {
      // 删除节点有两个子节点，找到右子节点的最小叶子节点（后继）
      //       -
      //     /    \
      //   del     -
      //   / \    / \
      //  -   -  -   -
      //     /
      //    -  <- 相当于删除这个节点
      let min = getBSTreeMin(node.right);
      // 转为上面两种情况
      node.right = RBTreeRemove(node.right, min.value);
      node.value = min.value;
    }
  }
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  return node;
}

/**
 * 红黑树删除时修复节点
 * @param node
 * @returns {*}
 */
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
        // 删除节点的兄弟节点为黑色
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
          //     红/null 红      红/null 黑   del 红/null       红/null
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

