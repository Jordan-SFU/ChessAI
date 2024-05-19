import openai
import os

#open environment variables

API_KEY = open("apikey.txt", "r").read().strip()

openai.api_key = API_KEY

class chatManager:

    def __init__(self):
        self.chatHistory = []
    
    def send_message(self, user_input):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", 
                       "content": 
            '''You are controlling a chess game, where the user gives you an object/person, and you have to turn it into a chess piece. You must define how it moves, attacks, and any additional abilities it may have. Here is an example of a pawns movement: 
            
            [
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            [[], [], ["capture"], ["move"], ["capture"], [], []],
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            ]

            There are multiple different actions that can be taken on each tile, which is why it's a nested array. The following is a list of ations you can choose from, along with descriptions of what they do:
            - "move": The chesspiece can move to this tile.
            - "capture": The chesspiece can capture an enemy piece on this tile.
            - "attack": the chesspiece can capture an ememy piece on this tile, but it does not move to that tile.
            - "stun": The chesspiece stuns a target piece, preventing it from moving for one turn. This chesspiece does not move.
            - "push": The chesspiece can push an enemy piece one tile in its movement direction.
            - "swap": The chesspiece can swap places with any piece.
                       
            This array is centered on the chesspiece, and shows what actions it can take on certain adjacent tiles. Your output array must be 7x7, but you are allowed to, and even encouraged, to leave spaces empty as to not make the piece too unbalanced. You can make very weak pieces. Do not include the name of the chesspiece anywhere in your response.
            Do not include any other writing or explanations in your response, only the proper format. Keep your chesspiece relatively simple, and not too overpowered. The index at the center of the array (3, 3) is the chesspiece itself, which is why it should always be empty.  
            This is the thing you must turn into a chess piece: ''' + user_input}],
        )

        return response.choices[0].message["content"]
    
    def create_chess_piece():
        # returns a JSON object containing information about the chess piece
        pass

chat_manager = chatManager()
user_input = "the swapper from the game 'The Swapper'"
response_content = chat_manager.send_message(user_input)
print(response_content)