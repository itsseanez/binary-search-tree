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
        if (value < pointer.data) {
            if (pointer.leftChild === null) {
                pointer.leftChild = createNode(value);
            } else {
                insertNode(value, pointer.leftChild);
            }

        } else if(value > pointer.data) {
            if (pointer.rightChild === null) {
                pointer.rightChild = createNode(value);
            } else {
                insertNode(value, pointer.rightChild);
            }

        }

    };

    const findMinNode = (node) => {
        // Find the leftmost node in the subtree
        while (node.leftChild !== null) {
            node = node.leftChild;
        }
        return node;
    };

    const deleteNode = (value, pointer = rootNode, parentNode = null, isLeftChild = false) => {
        if (pointer === null) {
            // Node not found
            return "No such node exists.";
        }
    
        if (value < pointer.data) {
            deleteNode(value, pointer.leftChild, pointer, true);
        } else if (value > pointer.data) {
            deleteNode(value, pointer.rightChild, pointer, false);
        } else {
            // Node with the value found
    
            // Case: Node is a leaf (no children)
            if (pointer.leftChild === null && pointer.rightChild === null) {
                if (parentNode !== null) {
                    // Set the appropriate child pointer of the parent to null
                    if (isLeftChild) {
                        parentNode.leftChild = null;
                    } else {
                        parentNode.rightChild = null;
                    }
                } else {
                    // The deleted node is the root node
                    rootNode = null;
                }
            }

            // Case: Node has 1 child
            if (pointer.leftChild == null && pointer.rightChild !== null) {
                let temp = pointer.rightChild
                if(parentNode.data < temp.data) {
                    parentNode.rightChild= temp
                }
                else {
                    parentNode.leftChild=temp
                }
                pointer.rightChild= null

            } else if (pointer.rightChild == null && pointer.leftChild !== null) {
                let temp = pointer.leftChild
                if(parentNode.data < temp.data) {
                    parentNode.rightChild= temp
                }
                else {
                    parentNode.leftChild=temp
                }
                pointer.leftChild= null

            } 
            
            //Case: Node has both children
            else {
                const successor = findMinNode(pointer.rightChild);
                pointer.data= successor.data
                deleteNode(successor.data, pointer.rightChild, pointer, false);

            }
        }
    };

    //Enter value to return node
    const find = (value, pointer= rootNode) => {
        if (pointer == null) return "No such node exists.";

        if(value < pointer.data) {
            return find(value, pointer.leftChild);
        }
        else if(value > pointer.data) {
            return find(value, pointer.rightChild);
        }
        else return {pointer};
    };

    //Breadth first search
    const levelOrder = (rootNode, callBack= null) => {
        let array= []
        let queue= [rootNode]
        while (queue.length > 0) {
            let currentNode= queue.shift();
            if (currentNode !== null) {

                //callback function
                if (callBack !== null) {
                    callBack(currentNode);
                }

                array.push(currentNode.data);

                //if current node has children, add them to queue
                if(currentNode.leftChild) {
                    queue.push(currentNode.leftChild);
                }
                if(currentNode.rightChild) {
                    queue.push(currentNode.rightChild);
                }
            }
        }


        return array;
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

    return {rootNode, insertNode, deleteNode, find, levelOrder, prettyPrint};
};

// Example usage
const myTree = Tree([1, 2, 3]);
myTree.insertNode(8);
myTree.insertNode(4);
myTree.insertNode(-4);
myTree.deleteNode(8);
myTree.deleteNode(2);
myTree.insertNode(43);
myTree.insertNode(24);
myTree.insertNode(-12);
myTree.insertNode(14);
myTree.prettyPrint(myTree.rootNode)
console.log(myTree.levelOrder(myTree.rootNode));
