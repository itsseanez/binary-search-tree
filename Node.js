const createNode = (value) => {
    return {
        data: value,
        leftChild: null,
        rightChild: null
    }
}

module.exports = createNode;