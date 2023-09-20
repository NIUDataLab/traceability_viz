from flask import Flask, render_template, Response, request, jsonify
import json
import heapq
from flask_cors import CORS # for sending data as a response
from dijkstar import Graph, find_path 

app = Flask(__name__)
CORS(app)

def grab_data():
    with open("cwe2cwesbert.json", "r") as f:
        data = f.read()
    return data 

def get_data():
    data_type = request.form.get('data_type')
    if data_type == 'CWE':
        with open("cwe2cwesbert.json", "r") as f:
            data = f.read()
    elif data_type == 'CAPEC':
        with open("minor_map.json", "r") as f:
            data = f.read()
    else:
        return jsonify({'error': 'Invalid data type'}), 400
    return data  

@app.route('/different.json', methods=['POST'])
def multiple():
    ##print(grab_data())
    resp = Response(response=get_data(), status=200)
    resp.headers.add('Access-Control-Allow-Origin', '*') ## the asterisk allows anyone to look at this data file 
    return resp
    ##return render_template('test.html')###


#@app.route('/calc/<int:num>')
#def post(num):
    #return str(num * num)

# ctrl + / to comment lines. Make sure mutiple things are selected.
# @app.route('/calc', methods=['POST'])
# def calc():
#     data = request.get_json()
#     start_node = data['start_node']
#     start_distance = data['start_distance']
#     print(start_node, start_distance)

#     # Load data from the JSON file
#     graph_data = json.loads(grab_data())
#     #print(graph_data)
#     # code to do the actual traversal


#     return "Data received"

@app.route('/data.json')
def index():
    ##print(grab_data())
    resp = Response(response=grab_data(), status=200)
    resp.headers.add('Access-Control-Allow-Origin', '*') ## the asterisk allows anyone to look at this data file 
    return resp
    ##return render_template('test.html')

@app.route('/calc', methods=['POST'])
def calc():
    data = request.get_json()
    start_node = data['start_node']
    max_distance = data['start_distance']

    # Load data from the JSON file
    graph_data = json.loads(grab_data())

    # Find the minimum and maximum edge weight
    min_weight = min(min(neighbors.values()) for neighbors in graph_data.values())
    max_weight = max(max(neighbors.values()) for neighbors in graph_data.values())

    # Normalize the edge weights using min-max normalization
    normalized_graph = {}
    for node, neighbors in graph_data.items():
        normalized_graph[node] = {}
        for neighbor, weight in neighbors.items():
            if node != neighbor:
                normalized_graph[node][neighbor] = (weight - min_weight) / (max_weight - min_weight)


    '''for node, neighbors in normalized_graph.items():
        print(f"{node}:")
        for neighbor, weight in neighbors.items():
            print(f"  - {neighbor}: {weight}")'''

    path, edge_weights, distance = nearest_neighbor_traversal_no_cycles(normalized_graph, start_node, max_distance)


    print("Path:", path)
    print("Edge weights:", edge_weights)
    print("Total cost:", distance)


    return jsonify({'path': path, 'edge_weights': edge_weights, 'distance': distance})

def nearest_neighbor_traversal_no_cycles(graph, start_node, max_distance):
    current_node = start_node
    path = [current_node]
    edge_weights = []
    distance = 0
    visited = {current_node}

    while True:
        if current_node not in graph:
            break

        neighbors = graph[current_node]
        next_node = max((n for n in neighbors if n not in visited), key=neighbors.get, default=None)
        if next_node is None:
            break

        next_distance = neighbors[next_node]

        if distance + next_distance > max_distance:
            break

        path.append(next_node)
        edge_weights.append(next_distance)
        distance += next_distance
        current_node = next_node
        visited.add(current_node)

    return path, edge_weights, distance

@app.route('/newcalc', methods=['POST'])
def new_calc():
    data = request.get_json()
    start_node = data['start_node']
    max_distance = data['start_distance']

    print(start_node, " ", max_distance)

    # Load data from the JSON file
    graph_data = json.loads(grab_data())

    # Find the minimum and maximum edge weight
    min_weight = min(min(neighbors.values()) for neighbors in graph_data.values())
    max_weight = max(max(neighbors.values()) for neighbors in graph_data.values())

    # Normalize the edge weights using min-max normalization
    normalized_graph = {}
    for node, neighbors in graph_data.items():
        normalized_graph[node] = {}
        for neighbor, weight in neighbors.items():
            if node != neighbor:
                normalized_graph[node][neighbor] = (weight - min_weight) / (max_weight - min_weight)

    #find_traversable_nodes(start_node, max_distance, normalized_graph)
    dijkstra(start_node, max_distance, normalized_graph)
    #print("hi")
    return jsonify("hi")


def find_traversable_nodes(start_node, max_distance, graph_data):
    # Initialize a queue with the start node
    queue = [(start_node, 0)]
    visited = set()

    while queue:
        # Get the next node and its distance from the start node
        current_node, current_distance = queue.pop(0)

        # If we've already visited this node, skip it
        if current_node in visited:
            continue

        # Mark this node as visited
        visited.add(current_node)

        # Print the current node and its distance from the start node
        print(f'Node: {current_node}, Distance: {current_distance}')

        # Add all neighbors of the current node to the queue
        for neighbor, weight in graph_data[current_node].items():
            new_distance = current_distance + weight

            # Only add neighbors that can be reached within the maximum distance
            if new_distance <= max_distance:
                queue.append((neighbor, new_distance))


import heapq

def dijkstra(start_node, max_distance, graph_data):
    # Create a priority queue and add the start node with distance 0
    queue = [(0, start_node)]
    
    # Keep track of the shortest known distance to each node
    distances = {start_node: 0}

    while queue:
        # Get the node with the smallest known distance
        current_distance, current_node = heapq.heappop(queue)

        # If the current distance exceeds the maximum distance, we can stop
        if current_distance > max_distance:
            break

        # Visit each neighbor of the current node
        for neighbor, weight in graph_data[current_node].items():
            new_distance = current_distance + weight

            # If this is the shortest known distance to this neighbor, update it
            if new_distance <= max_distance and (neighbor not in distances or new_distance < distances[neighbor]):
                distances[neighbor] = new_distance
                heapq.heappush(queue, (new_distance, neighbor))

    # Print all nodes that can be reached within the given distance
    for node, distance in distances.items():
        if distance <= max_distance:
            print(f'Node: {node}, Distance: {distance}')













