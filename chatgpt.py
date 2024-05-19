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
            messages=[{"role": "system", "content": '''You are controlling a chess game, where the user gives you an object/person, and you have to turn it into a chess piece. You must define how it moves, attacks, and any additional abilities it may have. Here is an example of a pawns movement: [
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            [[], [], ["capture"], ["move"], ["capture"], [], []],
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            ]

                       
            This array is centered on the chesspiece, and shows what actions it can take on which adjacent tiles.
            Do not include any other writing or explanations in your response, only the proper format.    
            This is the thing you must turn into a chess piece: ''' + user_input}],
        )

        return response.choices[0].message["content"]

# Example usage:
chat_manager = chatManager()
user_input = "fly"
response_content = chat_manager.send_message(user_input)
print(response_content)