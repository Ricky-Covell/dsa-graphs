class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(v => this.addVertex(v))
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.forEach(node => {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex)      
      }        
    })
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set()
    const result = []

    const traverse = (vertex) => {
      if (!vertex) return null

      visited.add(vertex)
      result.push(vertex.value)

      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          return traverse(neighbor)
        }
      })
    }
    
    traverse(start)
    return result
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set()
    const result = []
    const stack = [start]

    let currentVertex

    visited.add(start)

    while (stack.length) {
      currentVertex = stack.shift()
      result.push(currentVertex.value)

      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          stack.push(neighbor)
        }
      })
    }

    return result
  }
}

module.exports = {Graph, Node}