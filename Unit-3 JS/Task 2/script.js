const title = document.getElementById("title");
console.log(title);

console.log(document.nodeType);
console.log(title.nodeType);
console.log(title.firstChild.nodeType);

console.log(title.parentNode.nodeName);
console.log(title.parentNode);

const container = document.getElementById("container");

console.log(container.childNodes);
console.log(container.firstChild);
console.log(container.lastChild);
console.log(container.childNodes.length);
console.log(container.children.length);