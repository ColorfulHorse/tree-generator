/**
 * 判断红黑树正确性
 * @param node
 * @returns {boolean|*}
 */
function isRBTree(node) {
  let count = 0;
  let num = 0;
  let cur = root;
  while (cur) {
    if (!isRed(cur)) {
      count++;
    }
    cur = cur.left;
  }
  return check(node, count, num);
}

function check(node, total, num) {
  if (!node) {
    return true;
  }
  if (isRed(node) && isRed(node.parent)) {
    return false;
  }
  if (!isRed(node)) {
    num++;
  }
  if (!node.left && !node.right) {
    return total === num;
  }
  return check(node.left, total, num) && check(node.right, total, num);
}


function isAVL(node) {
  if (!node) {
    return true;
  }
  let res = true;
  if (node.left) {
    res = node.left.value < node.value;
  }
  if (node.right) {
    res = node.right.value > node.value;
  }
  res = Math.abs(getBalanceFactor(node)) <= 1;
  return res && isAVL(node.left) && isAVL(node.right);
}


/**
 * 随机删除红黑树节点
 */
function randomRBTreeRemove() {
  let index = Math.ceil(Math.random() * array.length - 1);
  RBTreeRemove(root, array[index]);
  array.splice(index);
  root = getRoot(root);
  // let isRB = isRBTree(root);
  // if (!isRB) {
  //   console.log("remove value:" + array[index] + "====isRB:"+isRB);
  // }
  showTree(true);
}

function randomAVLTreeRemove() {
  let index = Math.ceil(Math.random() * array.length - 1);
  root = BSTreeRemove(root, array[index], true);
  array.splice(index);
  // let res = isAVL(root);
  // if (!res) {
  //   console.log("remove value:" + array[index] + "====isAVL:"+res);
  // }
  showTree();
}
