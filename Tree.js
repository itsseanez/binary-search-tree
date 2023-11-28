const { default: createNode } = require('./Node');

const Tree = (array) => {
    //Sorts and makes array unique
    let sortedArray= array.sort();
    let uniqueArray= [...new Set(sortedArray)];

    //Initialize start and end
    let start= 0;
    let end= array.length-1

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
    
    return buildTree
};
