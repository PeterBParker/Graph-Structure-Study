const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require("constants");
const { on } = require("process");

class MapGraph {
    constructor(listOfNodes, listOfEdges) {
        // listOfNodes is an array of the unique node ID's in the graph
        // listOfEdges is an array of two-element arrays. The first element of the
        // inner array contains the origin node ID and the second element is the destination
        // node ID.
        this.graph = new Map();
        for (var node of listOfNodes) {
            this.addNode(node);
        }
        for (var edge of listOfEdges) {
            this.addEdge(edge[0], edge[1]);
        }
    }
    addNode(nodeID) {
        this.graph.set(nodeID, []);
    }
    addEdge(originNodeID, destinationNodeID) {
        this.graph.get(originNodeID).push(destinationNodeID);
        this.graph.get(destinationNodeID).push(originNodeID);
    }
    findRouteDFS(originID, destinationID) {
        // The stack structure of LIFO (Last In First Out) ensures that the algorithm
        // will search depth-first because the most recently added node will be visited first,
        // and its children will be added, and the most recently added of its children will be visited and so on.
        let stack = [originID];
        let visitedNodes=new Set();

        while(stack.length > 0) {
            var visitNode = stack.pop();

            if(visitNode == destinationID) {
                return true;
            }

            for(var child of this.graph.get(visitNode)) {
                if (!visitedNodes.has(child)) {
                    stack.push(child);
                }
            }
            visitedNodes.add(visitNode);
        }
        return false;  
    }

    findRouteBFS(originID, destinationID) {
        // The queue structure of FIFO (First In First Out) ensures the algorithm will 
        // search breadth-first because it will visit the nodes in order of their being added 
        // to the queue. So it will visit all the children of the first node before visiting any 
        // of its grandchildren and so on.
        let queue = [originID];
        let visitedNodes = new Set();

        while(queue.length > 0) {
            let visitNode = queue.shift();
            if (visitNode == destinationID) {
                return true;
            }
            for(var node of this.graph.get(visitNode)) {
                if(!visitedNodes.has(node)) {
                    queue.push(node);
                }
            }
            visitedNodes.add(visitNode);
        } 
        return false;
    }
}

module.exports = MapGraph;