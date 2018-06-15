function getAlldbIds (root) {
	var alldbId = [];
	if (!root) {
		return alldbId;
	}
	var queue = []; 
	queue.push(root); //push the root into queue
	while (queue.length > 0) {
		var node = queue.shift(); // the current node
		alldbId.push(node.dbId);
		if (node.children) {
			// put all the children in the queue too
			for (var i = 0; i < node.children.length; i++) {
				queue.push(node.children[i]);
			}
		}
	};
	console.log(alldbId)
	return alldbId;
};