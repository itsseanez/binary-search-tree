const createNode = require('./Node');

const Tree = (array) => {
    //Sorts and makes array unique
    let sortedArray= array.sort();
    let uniqueArray= [...new Set(sortedArray)];

    //Initialize start and end
    let start= 0;
    let end= uniqueArray.length-1

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
    let rootNode= buildTree(uniqueArray, start, end);

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

    return rootNode;
};

// Example usage
const myTree = Tree([4, 2, 6, 1, 3, 5, 7]);