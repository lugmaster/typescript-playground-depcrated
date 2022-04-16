let firstgenerationSize: number = 1;
let childrenPGen: number = 2;
let maxGenerations: number = 48;

let firstbornOfLastGenerationReached: boolean = false;

let sequence: number[] = generateIdSequenz(1000);

run();

function run() {
  console.log('Start');
  let nodes = initNodes();
  printNodes(nodes, 0);
  console.log('Finding Node:');
  console.log(findeNode(nodes));

  console.log('Creating/Printing IdMap: ');
  let idMap = createIdMap(nodes, new Map<number, MyNode>());
  printIdMap(idMap);
  console.log('Creating Json: ');
  console.log(createJSON(idMap));
  console.log('End');
}

//TODO wirte here
function findeNode(nodes: Array<MyNode>): MyNode {
  return null;
}
function initNodes() {
  let nodes = new Array();
  for (var i = 0; i < firstgenerationSize; i++) {
    nodes.push(generateNode(0));
  }
  return nodes;
}

interface MyNode {
  id: number;
  children: Array<MyNode>;
  generation: number;
}

interface MyFlatNode {
  id: number;
  children: number[];
  generation: number;
}

function generateIdSequenz(size: number): Array<number> {
  let idSequence = new Array();
  for (var i = 0; i < size; i++) {
    idSequence.push(i);
  }
  return idSequence;
}

function printNodes(nodes: Array<MyNode>, generation: number): void {
  console.log('Printing Generation ' + generation + ':');
  for (var i = 0; i < nodes.length; i++) {
    console.log(nodes[i]);
    if (nodes[i].children !== null) {
      for (var k = 0; k < nodes[i].children.length; k++) {
        printNodes(nodes[i].children, generation + 1);
      }
    }
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function generateNode(generation: number): MyNode {
  let node = {
    id: sequence.pop(),
    children: null,
    generation: generation,
  } as MyNode;

  if (generation === maxGenerations) {
    firstbornOfLastGenerationReached = true;
  }

  if (generation !== maxGenerations && !firstbornOfLastGenerationReached) {
    if (generation < 3) {
      node.children = new Array<MyNode>(childrenPGen);
    } else {
      node.children = new Array<MyNode>(getRandomInt(childrenPGen));
    }
    for (var i = 0; i < node.children.length; i++) {
      node.children[i] = generateNode(generation + 1);
    }
  }
  return node;
}

function createIdMap(
  nodes: Array<MyNode>,
  idMap: Map<number, MyNode>
): Map<number, MyNode> {
  for (var i = 0; i < nodes.length; i++) {
    if (idMap.has(nodes[i].id)) {
      console.log('Duplicate found! -> ' + nodes[i]);
    } else {
      idMap.set(nodes[i].id, nodes[i]);
    }
    if (nodes[i].children != null) {
      idMap = createIdMap(nodes[i].children, idMap);
    }
  }
  return idMap;
}

function printIdMap(idMap: Map<number, MyNode>) {
  for (let [key, value] of idMap) {
    console.log(key, value);
  }
}

function createJSON(idMap: Map<number, MyNode>) {
  let flatNodes = new Array<MyFlatNode>();
  for (let [key, value] of idMap) {
    let flatNode = {
      id: key,
      children: undefined,
      generation: value.generation,
    } as MyFlatNode;
    if (value.children !== null) {
      flatNode.children = value.children.map(function (child: { id: number }) {
        return child.id;
      });
    }
    flatNodes.push(flatNode);
  }
  return JSON.stringify(flatNodes);
}
