class TwoDimArrayGraph {
    constructor(listOfNodes, arrayOfEdges) {
        // listOfNodes is an array where each element is a unique node name
        // arrayOfEdges is an array of arrays where the innermost arrays are two elements long 
        // defining an edge of the graph. The first element is the unique ID of the connecting node 
        // and the second element is the unique ID of the connected node.
        this.listOfNodes = listOfNodes;
        this.arrayOfEdges = arrayOfEdges;
        this.nodeEnum = this.buildEnum(listOfNodes);
        this.graph = [...Array(listOfNodes.length)].map( () => Array(listOfNodes.length).fill(0));
        this.routesToEdges(arrayOfEdges);
    }
    setNodeEdge(node1, node2) {
        let retVal = false;
        if(node1 in this.nodeEnum && node2 in this.nodeEnum) {
            this.graph[this.nodeEnum[node1]][this.nodeEnum[node2]] = 1;
            retVal = true;
        }
        return retVal;        
    }
    clearNodeEdge(node1, node2) {
        let retVal = false;
        if(node1 in this.nodeEnum && node2 in this.nodeEnum) {
            this.graph[this.nodeEnum[node1]][this.nodeEnum[node2]] = 0;
            retVal = true;
        }
        return retVal;        
    }
    buildEnum(arr) {
        var enumBuilder = {};
        for(var i = 0; i < arr.length; i++) {
            enumBuilder[arr[i]] = i;
        }
        return Object.freeze(enumBuilder);
    }
    routesToEdges(routes) {
        for(var edge of routes) {
            let res = this.setNodeEdge(edge[0], edge[1]);
            if(res == false) {
                console.log("FAILED connecting nodes: ", edge[0], " and ", edge[1]);
            } else {
                console.log("SUCCESS connecting nodes: ", edge[0], " and ", edge[1]);
            }
        }
    }
    findRoute(originID, destinationID) {
        
    }
}

module.exports = TwoDimArrayGraph;