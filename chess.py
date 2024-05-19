class chessboard():
    def __init__(self):
        self.board = [[0 for x in range(8)] for y in range(8)]
        self.letter_to_index = {chr(i+65): i for i in range(8)}
        self.index_to_letter = {i: chr(i+65) for i in range(8)}

        self.white_points = 0
        self.black_points = 0
        self.game_over = False
        self.winner = None
        self.turn_count = 0

    def get_turn_count(self):
        return int(self.turn_count / 2)

    def set_piece(self, piece, position):
        self.board[position[0]][position[1]] = piece
        return piece

    def get_piece(self, position):
        return self.board[position[0]][position[1]]

    def initialize_board(self):
        # Initialize white pieces
        self.set_piece(chesspiece("rook", "white", [0, 0], rook_movement, self), [0, 0])
        self.set_piece(chesspiece("night", "white", [0, 1], knight_movement, self), [0, 1])
        self.set_piece(chesspiece("bishop", "white", [0, 2], bishop_movement, self), [0, 2])
        self.set_piece(chesspiece("queen", "white", [0, 3], queen_movement, self), [0, 3])
        self.set_piece(chesspiece("king", "white", [0, 4], king_movement, self), [0, 4]).isKing = True
        self.set_piece(chesspiece("bishop", "white", [0, 5], bishop_movement, self), [0, 5])
        self.set_piece(chesspiece("night", "white", [0, 6], knight_movement, self), [0, 6])
        self.set_piece(chesspiece("rook", "white", [0, 7], rook_movement, self), [0, 7])
        for i in range(8):
            self.set_piece(chesspiece("pawn", "white", [1, i], pawn_movement, self), [1, i])

        # Initialize black pieces
        self.set_piece(chesspiece("rook", "black", [7, 0], rook_movement, self), [7, 0])
        self.set_piece(chesspiece("night", "black", [7, 1], knight_movement, self), [7, 1])
        self.set_piece(chesspiece("bishop", "black", [7, 2], bishop_movement, self), [7, 2])
        self.set_piece(chesspiece("queen", "black", [7, 3], queen_movement, self), [7, 3])
        self.set_piece(chesspiece("king", "black", [7, 4], king_movement, self), [7, 4]).isKing = True
        self.set_piece(chesspiece("bishop", "black", [7, 5], bishop_movement, self), [7, 5])
        self.set_piece(chesspiece("night", "black", [7, 6], knight_movement, self), [7, 6])
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

    def get_board_state(self):
        return self.board

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
        self.stunned = False
        self.shielded = False

        self.isKing = False
        self.brittle = False
        self.splash = False

    def move(self, position):
        # update position on board
        self.board.set_piece(0, self.position)
        self.position = position
        self.board.set_piece(self, position)
        
        # Check for promotion
        if self.name == "pawn" and (position[0] == 0 or position[0] == 7):
            self.promote()

    def tileable(self, position):
        # Check if the target position is within the bounds of the board
        if not (0 <= position[0] < 8 and 0 <= position[1] < 8):
            return False
        relative_position = [(position[0] - self.position[0]) * (1 if self.color == "black" else -1), position[1] - self.position[1]]
        target_piece = self.board.get_piece(position)

        for moveType in self.movement[relative_position[0] + 3][relative_position[1] + 3]:
            match moveType:
                case "capture":
                    #check if valid capture
                    if target_piece != 0 and target_piece.color == ("black" if self.color == "white" else "white"):
                        if self.check_path_clear(position):
                            print(f"{self.color} {self.name} captured {target_piece.color} {target_piece.name}")
                            if self.color == "black":
                                self.board.black_points += 1
                            else:
                                self.board.white_points += 1
                            self.move(position)
                    return True
                            
                case "attack":
                    if target_piece.color == ("black" if self.color == "white" else "white"):
                        if self.check_path_clear(position):
                            print(f"{self.color} {self.name} attacked {target_piece.color} {target_piece.name}")
                            if self.color == "black":
                                self.board.black_points += 1
                            else:
                                self.board.white_points += 1
                            self.board.set_piece(0, self.position)
                    return True
                
                case "swap":
                    if target_piece != 0:
                        if self.check_path_clear(position):
                            prev_position = self.position
                            board.set_piece(self, position)
                            board.set_piece(target_piece, prev_position)
                    return True

                case "stun":
                    if target_piece != 0 and target_piece.color != self.color:
                        if self.check_path_clear(position):
                            print(f"{self.color} {self.name} stunned {target_piece.color} {target_piece.name}")
                            target_piece.stunned = True
                    return True

                case "push":
                    if target_piece != 0 and target_piece.color != self.color:
                        if self.check_path_clear(position):
                            # Get the direction of movement
                            delta_x = 1 if position[1] > self.position[1] else (-1 if position[1] < self.position[1] else 0)
                            delta_y = 1 if position[0] > self.position[0] else (-1 if position[0] < self.position[0] else 0)
                            
                            # check if the target push position is within the bounds of the board, and if the target push position is empty
                            if 0 <= position[0] + delta_y < 8 and 0 <= position[1] + delta_x < 8 and self.board.get_piece([position[0] + delta_y, position[1] + delta_x]) == 0:
                                target_piece.move([position[0] + delta_y, position[1] + delta_x])
                                self.move(position)
                    return True

                case "shield":
                    if target_piece != 0 and target_piece.color == self.color:
                        if self.check_path_clear(position):
                            print(f"{self.color} {self.name} shielded {target_piece.color} {target_piece.name}")
                            target_piece.shielded = True
                    return True

                case "move":
                    if target_piece == 0:
                        if self.check_path_clear(position):
                            self.move(position)
                    return True

                case "first_move":
                    if board.get_turn_count() == 0:
                        if target_piece == 0:
                            if self.check_path_clear(position):
                                self.move(position)
                        return True

                case _: 
                    print ("invalid move") 
                    return False
        return True



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
                # maybe the second - shouldne be terhere
                if "move" in self.movement[-relative_position[0] + 3][-relative_position[1] + 3]:
                    if self.check_path_clear(position):
                        return True
                return False
        else:
            # Check if the movement is a valid capture
            if target_piece.color != self.color:
                if self.color == "black":
                    if "capture" in self.movement[relative_position[0] + 3][relative_position[1] + 3]:
                        if self.check_path_clear(position):
                            print(f"{self.color} {self.name} captured {target_piece.color} {target_piece.name}")
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
                    if "capture" in self.movement[-relative_position[0] + 3][-relative_position[1] + 3]:
                        if self.check_path_clear(position):
                            print(f"{self.color} {self.name} captured {target_piece.color} {target_piece.name}")
                            if self.color == "black":
                                self.board.black_points += 1
                            else:
                                self.board.white_points += 1

                            # Check if the captured piece is a king
                            if target_piece.isKing == True:
                                self.board.game_over = True
                                self.board.winner = self.color

                            return True

            return False
#redo this dumass
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
    [[], [], [], ["first_move"], [], [], []],
    [[], [], ["capture"], ["move"], ["capture"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
]

rook_movement = [
    [[], [], [], ["move", "capture"], [], [], []],
    [[], [], [], ["move", "capture"], [], [], []],
    [[], [], [], ["move", "capture"], [], [], []],
    [["move"], ["move"], ["move"], [], ["move"], ["move"], ["move"]],
    [[], [], [], ["move", "capture"], [], [], []],
    [[], [], [], ["move", "capture"], [], [], []],
    [[], [], [], ["move", "capture"], [], [], []],
]

knight_movement = [
    [[], [], [], [], [], [], []],
    [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
    [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
    [[], [], [], [], [], [], []],
    [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
    [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
    [[], [], [], [], [], [], []]
]

bishop_movement = [
    [["move", "capture"], [], [], [], [], [], ["move", "capture"]],
    [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
    [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], ["move", "capture"], [], ["move", "capture"], [], []],
    [[], ["move", "capture"], [], [], [], ["move", "capture"], []],
    [["move", "capture"], [], [], [], [], [], ["move", "capture"]],
]

queen_movement = [
    [["move", "capture"], [], [], ["move", "capture"], [], [], ["move", "capture"]],
    [[], ["move", "capture"], [], ["move", "capture"], [], ["move", "capture"], []],
    [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
    [["move", "capture"], ["move", "capture"], ["move", "capture"], [], ["move", "capture"], ["move", "capture"], ["move", "capture"]],
    [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
    [[], ["move", "capture"], [], ["move", "capture"], [], ["move", "capture"], []],
    [["move", "capture"], [], [], ["move", "capture"], [], [], ["move", "capture"]],
]

king_movement = [
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
    [[], [], ["move", "capture"], [                ], ["move", "capture"], [], []],
    [[], [], ["move", "capture"], ["move", "capture"], ["move", "capture"], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
]


board = chessboard()
board.initialize_board()

print(board.get_board_state())

current_color = "black"

while not board.game_over:
    board.display_board()

    print("Current turn: ", current_color)
    print("Turn #: ", board.get_turn_count())
    print("Black points: ", board.black_points)
    print("White points: ", board.white_points)
    print("")
    piece_pos = input("Enter piece position (e.g., B2): ")
    piece_pos = board.convert_position(piece_pos)

    piece = board.get_piece(piece_pos)
    # check if the piece is the correct color
    if piece == 0 or piece.color != current_color or piece.stunned == True:
        print("Invalid piece")
        continue

    move_pos = input("Enter move position (e.g., C3): ")
    move_pos = board.convert_position(move_pos)

    if piece.tileable(move_pos) == False:
        print("Invalid movement")
        continue

    if board.game_over:
        print(f"Game over! {board.winner.capitalize()} wins!")
        break

    board.turn_count += 1
    current_color = "black" if current_color == "white" else "white"