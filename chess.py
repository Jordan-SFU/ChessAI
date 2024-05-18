class chessboard():
    def __init__(self):
        self.board = [[0 for x in range(8)] for y in range(8)]
        self.letter_to_index = {chr(i+65): i for i in range(8)}
        self.index_to_letter = {i: chr(i+65) for i in range(8)}

        self.white_points = 0
        self.black_points = 0
        self.game_over = False
        self.winner = None

    def set_piece(self, piece, position):
        self.board[position[0]][position[1]] = piece

    def get_piece(self, position):
        return self.board[position[0]][position[1]]

    def initialize_board(self):
        # Initialize white pieces
        self.set_piece(chesspiece("rook", "white", [0, 0], rook_movement, self), [0, 0])
        self.set_piece(chesspiece("knight", "white", [0, 1], knight_movement, self), [0, 1])
        self.set_piece(chesspiece("bishop", "white", [0, 2], bishop_movement, self), [0, 2])
        self.set_piece(chesspiece("queen", "white", [0, 3], queen_movement, self), [0, 3])
        self.set_piece(chesspiece("king", "white", [0, 4], king_movement, self), [0, 4])
        self.set_piece(chesspiece("bishop", "white", [0, 5], bishop_movement, self), [0, 5])
        self.set_piece(chesspiece("knight", "white", [0, 6], knight_movement, self), [0, 6])
        self.set_piece(chesspiece("rook", "white", [0, 7], rook_movement, self), [0, 7])
        for i in range(8):
            self.set_piece(chesspiece("pawn", "white", [1, i], pawn_movement, self), [1, i])

        # Initialize black pieces
        self.set_piece(chesspiece("rook", "black", [7, 0], rook_movement, self), [7, 0])
        self.set_piece(chesspiece("knight", "black", [7, 1], knight_movement, self), [7, 1])
        self.set_piece(chesspiece("bishop", "black", [7, 2], bishop_movement, self), [7, 2])
        self.set_piece(chesspiece("queen", "black", [7, 3], queen_movement, self), [7, 3])
        self.set_piece(chesspiece("king", "black", [7, 4], king_movement, self), [7, 4])
        self.set_piece(chesspiece("bishop", "black", [7, 5], bishop_movement, self), [7, 5])
        self.set_piece(chesspiece("knight", "black", [7, 6], knight_movement, self), [7, 6])
        self.set_piece(chesspiece("rook", "black", [7, 7], rook_movement, self), [7, 7])
        for i in range(8):
            self.set_piece(chesspiece("pawn", "black", [6, i], pawn_movement, self), [6, i])

    def display_board(self):
        print("  A B C D E F G H")
        for i in range(8):
            print(i+1, end=" ")
            for j in range(8):
                if self.get_piece([i, j]) == 0:
                    print("0", end=" ")
                else:
                    print(self.get_piece([i, j]).name[0], end=" ")  # Display first letter of piece name
            print("")

    def convert_position(self, pos):
        letter, number = pos[0], pos[1]
        return [int(number)-1, self.letter_to_index[letter]]

class chesspiece():
    def __init__(self, name, color, position, movement, board):
        self.name = name
        self.color = color
        self.position = position
        self.movement = movement
        self.board = board

    def move(self, position):
        # update position on board
        if self.check_if_valid(position):
            self.board.set_piece(0, self.position)
            self.position = position
            self.board.set_piece(self, position)
            
            # Check for promotion
            if self.name == "pawn" and (position[0] == 0 or position[0] == 7):
                self.promote()

            return True
        else:
            return False
        
    def check_if_valid(self, position):
        # Check if the target position is within the bounds of the board
        if not (0 <= position[0] < 8 and 0 <= position[1] < 8):
            return False

        # Get relative position
        relative_position = [position[0] - self.position[0], position[1] - self.position[1]]

        # Check if the target tile is empty
        target_piece = self.board.get_piece(position)

        # Check if the movement is valid
        if target_piece == 0:
            # Check if there are obstructions along the movement path
            if self.color == "black":
                if "move" in self.movement[relative_position[0] + 3][relative_position[1] + 3]:
                    if self.check_path_clear(position):
                        return True
                return False
            else:
                if "move" in self.movement[-relative_position[0] + 3][-relative_position[1] + 3]:
                    if self.check_path_clear(position):
                        return True
                return False
        else:
            # Check if the movement is a valid attack
            if target_piece.color != self.color:
                if self.color == "black":
                    if "attack" in self.movement[relative_position[0] + 3][relative_position[1] + 3]:
                        if self.check_path_clear(position):
                            print(f"{self.color} {self.name} attacked {target_piece.color} {target_piece.name}")
                            if self.color == "black":
                                self.board.black_points += 1
                            else:
                                self.board.white_points += 1

                            # Check if the captured piece is a king
                            if target_piece.name == "king":
                                self.board.game_over = True
                                self.board.winner = self.color

                            return True
                else:
                    if "attack" in self.movement[-relative_position[0] + 3][-relative_position[1] + 3]:
                        if self.check_path_clear(position):
                            print(f"{self.color} {self.name} attacked {target_piece.color} {target_piece.name}")
                            if self.color == "black":
                                self.board.black_points += 1
                            else:
                                self.board.white_points += 1

                            # Check if the captured piece is a king
                            if target_piece.name == "king":
                                self.board.game_over = True
                                self.board.winner = self.color

                            return True

            return False

    def check_path_clear(self, target_position):
        # Get the direction of movement
        delta_x = 1 if target_position[1] > self.position[1] else (-1 if target_position[1] < self.position[1] else 0)
        delta_y = 1 if target_position[0] > self.position[0] else (-1 if target_position[0] < self.position[0] else 0)

        # Traverse the path from current position to target position
        x, y = self.position[1] + delta_x, self.position[0] + delta_y
        while x != target_position[1] or y != target_position[0]:
            if self.board.get_piece([y, x]) != 0:
                return False
            x += delta_x
            y += delta_y
        return True

    def promote(self):
        new_piece_name = input("Promote pawn to (queen/rook/bishop/knight): ").lower()
        if new_piece_name not in ["queen", "rook", "bishop", "knight"]:
            new_piece_name = "queen"
        movements = {
            "queen": queen_movement,
            "rook": rook_movement,
            "bishop": bishop_movement,
            "knight": knight_movement
        }
        self.name = new_piece_name
        self.movement = movements[new_piece_name]
        print(f"Pawn promoted to {new_piece_name}")

# Define movements for each piece using nested array
pawn_movement = [
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], ["attack"], ["move"], ["attack"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
]

rook_movement = [
    [["move"], ["move"], ["move"], ["move", "attack"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move", "attack"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move", "attack"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], [], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move", "attack"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move", "attack"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move", "attack"], ["move"], ["move"], ["move"]],
]

knight_movement = [
    [[], [], [], [], [], [], []],
    [[], [], ["move"], [], ["move"], [], []],
    [[], ["move"], [], [], [], ["move"], []],
    [[], [], [], [], [], [], []],
    [[], ["move"], [], [], [], ["move"], []],
    [[], [], ["move"], [], ["move"], [], []],
    [[], [], [], [], [], [], []]
]

bishop_movement = [
    [["move"], [], [], [], [], [], ["move"]],
    [[], ["move"], [], [], [], ["move"], []],
    [[], [], ["move"], [], ["move"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], ["move"], [], ["move"], [], []],
    [[], ["move"], [], [], [], ["move"], []],
    [["move"], [], [], [], [], [], ["move"]],
]

queen_movement = [
    [["move"], ["move"], ["move"], ["move"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move"], ["move"], ["move"], ["move"]],
    [["move"], ["move"], ["move"], ["move"], ["move"], ["move"], ["move"]],
]

king_movement = [
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], ["move"], ["move"], ["move"], [], []],
    [[], [], ["move"], [], ["move"], [], []],
    [[], [], ["move"], ["move"], ["move"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
]

board = chessboard()
board.initialize_board()

current_color = "black"

while not board.game_over:
    board.display_board()

    print("Current turn: ", current_color)
    print("Black points: ", board.black_points)
    print("White points: ", board.white_points)
    print("")
    piece_pos = input("Enter piece position (e.g., B2): ")
    piece_pos = board.convert_position(piece_pos)

    piece = board.get_piece(piece_pos)
    # check if the piece is the correct color
    if piece == 0 or piece.color != current_color:
        print("Invalid piece")
        continue

    move_pos = input("Enter move position (e.g., C3): ")
    move_pos = board.convert_position(move_pos)

    if piece.move(move_pos) == False:
        print("Invalid movement")
        continue

    if board.game_over:
        print(f"Game over! {board.winner.capitalize()} wins!")
        break

    current_color = "black" if current_color == "white" else "white"