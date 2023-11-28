const createNode = require('./Node');

const Tree = (array) => {
    //Sorts and makes array unique
    let sortedArray = array.sort((a, b) => a - b);
    let uniqueArray= [...new Set(sortedArray)];

    //finds the root node of an array and builds a treee
    const buildTree = (array, start, end) => {

        //End recursive function
        if (start>end) return null;
        let mid= Math.floor((start + end) / 2);
        
        //Create root node
        let root= createNode(array[mid]);
        root.leftChild= buildTree(array, start, mid-1);
        root.rightChild= buildTree(array, mid+1, end)
        return root;
    }

    //Initialize root node
    let rootNode= buildTree(uniqueArray, 0, uniqueArray.length-1);

    //Insert new node into the tree
    const insertNode = (value, pointer = rootNode) => {
        if (value < pointer.value) {
            if (pointer.leftChild === null) {
                pointer.leftChild = createNode(value);
                prettyPrint(rootNode);
            } else {
                insertNode(value, pointer.leftChild);
            }

        } else if(value > pointer.value) {
            if (pointer.rightChild === null) {
                pointer.rightChild = createNode(value);
                prettyPrint(rootNode);
            } else {
                insertNode(value, pointer.rightChild);
            }

        } else {
            createNode(value)
        }

    };


    const deleteNode = (value, pointer = rootNode) => {
        
    };

    //Binary Search tree visualization
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.rightChild !== null) {
            prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.leftChild !== null) {
            prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
    
    // Print the tree
    prettyPrint(rootNode);

    return {rootNode, insertNode, deleteNode};
};

// Example usage
const myTree = Tree([1, 2, 3]);
myTree.insertNode(8);
