import openai

API_KEY = "sk-proj-4va0xZrqno7nR7jlvPMbT3BlbkFJtXXozEx7aSDyT8lTDu7K"
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
                       
            this is the thing you must turn into a chess piece: ''' + user_input}],
        )

        return response.choices[0].message["content"]

# Example usage:
chat_manager = chatManager()
user_input = "thermonuclear bomb"
response_content = chat_manager.send_message(user_input)
print(response_content)