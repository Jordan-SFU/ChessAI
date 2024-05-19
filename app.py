from flask import Flask, request, jsonify
from flask_cors import CORS
from chess import chessboard

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

board = chessboard()
board.initialize_board()

@app.route('/initialize', methods=['GET'])
def initialize():
    board.initialize_board()
    return jsonify(board.get_board_state())

@app.route('/move', methods=['POST'])
def move():
    return "Move"

if __name__ == '__main__':
    app.run(debug=True)