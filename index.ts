let firstgenerationSize = 1;
let childrenPGen = 2;
let maxGenerations = 3;
let sequence = generateIdSequenz(1000);
let nodes = initNodes();

run();

function run() {
  console.log('Start');
  //printNodes(nodes);
  console.log('Finding Node:');
  console.log(findeNode(nodes));
  let duplicates = findDuplicates(nodes);
  console.log('Duplicates found:');
  printNodes(duplicates);
  console.log('End');
}

//TODO wirte here
function findeNode(nodes: Array<MyNode>): MyNode {
  return null;
}

function initNodes() {
  let nodes = new Array();
  for (var i = 0; i < firstgenerationSize; i++) {
    nodes.push(generateNode());
  }
  nodes = appendChildren(nodes, 0);
  return nodes;
}

function appendChildren(nodes: Array<MyNode>, generation: number) {
  if (generation === maxGenerations) {
    return nodes;
  }
  let children = new Array<MyNode>();
  for (var i = 0; i < nodes.length; i++) {
    for (var k = 0; k < nodes[i].children.length; k++) {
      children.push(generateNodeWithId(nodes[i].children[k]));
    }
  }
  nodes = appendChildren(children, generation + 1);
  nodes = nodes.concat(children);
  return nodes;
}

function generateChildrenIds(amount: number): Array<number> {
  let ids = new Array(amount);
  for (var i = 0; i < amount; i++) {
    ids[i] = sequence.pop();
  }
  return ids;
}

interface MyNode {
  id: number;
  children: number[];
}

function generateIdSequenz(size: number): Array<number> {
  let idSequence = new Array();
  for (var i = 0; i < size; i++) {
    idSequence.push(i);
  }
  return idSequence;
}

function printNodes(nodes: Array<MyNode>): void {
  for (var i = 0; i < nodes.length; i++) {
    console.log(nodes[i]);
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function generateNode(): MyNode {
  return {
    id: sequence.pop(),
    //children: generateChildrenIds(getRandomInt(childrenPGen)),
    children: generateChildrenIds(childrenPGen),
  };
}

function generateNodeWithId(id: number): MyNode {
  return {
    id: id,
    children: generateChildrenIds(getRandomInt(childrenPGen)),
  };
}

function findDuplicates(nodes: Array<MyNode>): Array<MyNode> {
  let idMap = new Map<number, MyNode>();
  let duplicates: Array<MyNode> = new Array<MyNode>();
  for (var i = 0; i < nodes.length; i++) {
    if (idMap.has(nodes[i].id)) {
      duplicates.push(nodes[i]);
    } else {
      idMap.set(nodes[i].id, nodes[i]);
    }
  }
  return duplicates;
}
