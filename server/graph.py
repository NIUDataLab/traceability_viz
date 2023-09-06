from flask import Flask, render_template, Response, request
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

#@app.route('/calc/<int:num>')
#def post(num):
    #return str(num * num)

'''@app.route('/calc', methods=['POST'])
def calc():
    data = request.get_json()
    start_node = data['start_node']
    start_distance = data['start_distance']
    print(start_node, start_distance)

    # Load data from the JSON file
    graph_data = json.loads(grab_data())
    #print(graph_data)
    # code to do the actual traversal


    return "Data received"'''

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


    return "hi"

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












