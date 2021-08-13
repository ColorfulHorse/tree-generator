const RED = 0;
const BLACK = 1;

function Node(value) {
  this.height = 1;
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.color = RED;

  this.isLinkedList = false;
  this.width = 0;
  this.offset = 0;
}

function getHeight(node) {
  return node ? node.height : 0;
}
