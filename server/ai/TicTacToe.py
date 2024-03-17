from copy import deepcopy
import numpy as np
from MCTS import *

class Board():
    # initialize the board
    def __init__(self, level, board=None):
        # initialize the players
        self.player_1 = 'X'
        self.player_2 = 'O'

        # initialize the empty carcater
        self.empty_cara = '#'

        # initialize the board
        self.state = np.array([self.empty_cara for i in range(9)])

        # # hardness level
        self.level = level

        # initialize the Monte Carlo Tree Searcg object
        self.mcts = MCTS(self.level)

        # initialize the board with the previous copy if it exist
        if board is not None:
            self.__dict__  = (deepcopy(board.__dict__))

    # creat reset function
    def reset(self):
        # reset the board
        self.state = np.array([self.empty_cara for i in range(9)])

    # creat a function to make moves
    def make_move(self, move):
        # make a next board instance (inherate from the current board instance)
        board = Board(self.level, self)

        # make the move 
        board.state[move] = self.player_1

        # swap players
        (board.player_1, board.player_2) = (board.player_2, board.player_1)

        # return the new board
        return board
    
    # check if the state is a win
    def is_win(self):
        # reshape the board to a matric
        board = self.state.reshape((3, 3))

        # loop over the rows and columns
        for i in range(3):
            # check if any of the rows # or # the columns is similar to player_1 sign
            if (board[i, :] == np.array([self.player_2 for i in range(3)])).all() or (board[:, i] == np.array([self.player_2 for i in range(3)])).all():
                # return that it's a win
                return True
            
        # check if any of the diagonals is similar to player_1 sign
        if (board.diagonal() == self.player_2).all() or (np.flip(board, axis=1).diagonal() == self.player_2).all():
            # return that it's a win
            return True
        
        # By default it's not a win
        return False
    
    # check if the state is a draw
    def is_draw(self):
        #check if the game is not a win
        if not self.is_win():
            # check if the board not containing any of the empty caracter
            if not self.state.__contains__(self.empty_cara):
                # if so return true
                return True

        return False
    
    # return a list of possible mouvements instences
    def generate_states(self):
        # create the list
        actions = []
        moves = []
        # pass over all the board
        for i in range(9):
            # check if the caractere on the board is an empty caractere
            if self.state[i] == self.empty_cara:
                # append the list with a game state on the empty caractere
                actions.append(self.make_move(i))
                moves.append(i)
        # return the list containing the possible mouvements states (available actions)
        return actions, moves

    # print the board state
    def __str__(self):
        # make the return variable
        board_str = ''

        if not self.is_win() and not self.is_draw():
            # add player x move
            if self.player_1 == 'X':
                board_str += "\n-----------------\n X player move:\n-----------------\n"

            # add player x move
            elif self.player_1 == 'O':
                board_str += "\n-----------------\n O player move:\n-----------------\n"


        # add the board
        board_str += str(self.state.reshape((3, 3)))

        # retrun the player and the board
        return board_str
    
    
    # main game loop
    def game_loop(self, user_input):

        # create MCTS instance
        mcts = MCTS(self.level)


        # check if the input is empty
        if user_input == '': return
        
        # converte the input to integer move
        move = int(user_input)
        
        try:
            # check if the move is legal
            if self.state[move] != self.empty_cara:
                print("Illegal move!")
                return

            # make the move
            self = self.make_move(move)
            
            # search for the best move
            best_move = mcts.search(self)

            # make AI move here
            self = best_move.board

            # print the move
            print(self)

        except Exception as e:
            print("Error: ", e)
            print("Invalid move!!\n")
            return

        # check if win or draw and break if so
        if self.is_win():
            return
        elif self.is_draw():
            return

        return {'text': "game_loop done"}
    