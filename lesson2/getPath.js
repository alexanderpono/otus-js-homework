console.log('=== getPath ===');

console.log(getPath(document.getElementById('obj1')));
console.log(getPath(document.getElementById('but')));
console.log(getPath(document.getElementById('obj3')));


function getPath(aObj) {
    let path = [];

    for (let currentNode = aObj; currentNode != null; currentNode = currentNode.parentNode) {
        if (currentNode.localName === 'body') {
            break;
        };
        let childIndex = getChildIndex(currentNode);
        let parent = currentNode.parentNode;
        let pathItem = getPathItem(currentNode);
        path.push(pathItem);
    }

    path.reverse();

    let pathS = path.join('>');
    return pathS;
}


function getChildIndex(child) {
    var index=1;
    while (child.previousSibling) {
        child = child.previousSibling;
        if (child.nodeType === 1){
            index++;
        };
    };
    return index;
}


function getPathItem(childNode) {
    let childIndex = getChildIndex(childNode);
    let childrenTagNamesCount = getChildrenTagNames(childNode.parentNode);
    if (childrenTagNamesCount[childNode.localName] === 1) {
        return childNode.localName;
    }
    else {
        return childNode.localName + ':nth-child('+childIndex+')';
    }
}


function getChildrenTagNames(node) {
    var tagNames = {};
    for (let i = 0; i < node.childNodes.length; i++) {
        let childNode = node.childNodes[i];
        if (childNode.nodeType !== 1) {
            continue;
        };
        let tagName = childNode.localName;
        if (typeof tagNames[tagName] !== 'undefined') {
            tagNames[tagName]++;
        }
        else {
            tagNames[tagName] = 1;
        };
    };

    return tagNames;
}
