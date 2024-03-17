from TicTacToe import *

from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, request, reqparse, abort, fields, marshal_with

app = Flask(__name__)
CORS(app)
api = Api(app)
board = None
class Start(Resource):

    def post(self):
        global board
        
        data = request.get_json()
        
        board = Board(data['level'])
        # board = Board()
        board.reset()
        # return {"message": "Welcome to Tic Tac Toe game by OMHNS", "board": board.__str__(), 'index': '', 'win': False, 'draw': False, 'end': False}, 200
        return {"message": "Welcome to Tic Tac Toe game by OMHNS", "board": board.state.tolist(), 'index': '', 'win': False, 'draw': False, 'end': False}, 200
    
    def put(self):
        global board
        win = False
        draw = False
        end = False

        # data = start_args.parse_args(req=None)
        data = request.get_json()

        
        move = data['index']
        if move == 'exit':
            return {"message": 'End game!', 'board': board.state.tolist(), 'index': '', 'win': win, 'draw': draw, 'end': end}, 200

        # create MCTS instance
        mcts = board.mcts
        # mcts = MCTS(data['level'])

        # check if the input is empty
        if move == None:
            # return {"message": "No move selected!", "board": board.__str__(), 'index': '', 'win': False, 'draw': False, 'end': False}, 400
            return {"message": 'No move selected!', 'board': board.state.tolist(), 'index': '', 'win': win, 'draw': draw, 'end': end}, 400
        
        try:
            # check if the move is legal
            if board.state[move] != board.empty_cara:
                # return {"message": "Illegal move!", "board": board.__str__(), 'index': '', 'win': False, 'draw': False, 'end': False}, 400
                return {"message": 'Illegal move!', 'board': board.state.tolist(), 'index': '', 'win': win, 'draw': draw, 'end': end}, 400

            # make the move
            board = board.make_move(move)
            
            # search for the best move
            best_move = mcts.search(board, move)

            # make AI move here
            board = best_move.board

        except Exception as e:
            print("Error: ", e)
            # return {"message": "Invalid move!", "board": board.__str__(), 'index': '', 'win': False, 'draw': False, 'end': False}, 400
            return {"message": 'Invalid move!', 'board': board.state.tolist(), 'index': '', 'win': win, 'draw': draw, 'end': end}, 400

        # check if win or draw and break if so
        if board.is_win():
            if board.player_2 == 'X':
                win = True
                end = True
                return {"message": '', 'board': board.state.tolist(), 'index': None, 'win': win, 'draw': draw, 'end': end}, 200
                
            end = True
            return {"message": '', 'board': board.state.tolist(), 'index': best_move.index, 'win': win, 'draw': draw, 'end': end}, 200

        elif board.is_draw():
            draw = True
            end = True
            return {"message": '', 'board': board.state.tolist(), 'index': None, 'win': win, 'draw': draw, 'end': end}, 200

        print(best_move.index)
        # return {"message":  '', 'board' : board.__str__(), 'index': best_move.index, 'win': win, 'draw': draw, 'end': end}, 200
        return {"message": '', 'board': board.state.tolist(), 'index': best_move.index, 'win': win, 'draw': draw, 'end': end}, 200
    

api.add_resource(Start, "/Offline/Start")   # {{"level": 0.2}, {"index": 0}}

if __name__ == '__main__':
    app.run(debug=True)


    
    # b = Board()
    # b.game_loop()