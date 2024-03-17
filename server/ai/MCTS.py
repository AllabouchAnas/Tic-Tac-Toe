import numpy as np
import math


# create the Node class
class TreeNode():
    def __init__(self, board, parent, index):
        # intialise the current node board
        self.board = board
        self.index = index

        # initialise wethere the node's a flag/terminal node (if the node is in the end of the tree)
        if self.board.is_win() or self.board.is_draw():
            self.is_terminal  = True
        else:
            self.is_terminal = None

        # initialise wether the node's is fully expanded/ descovered
        self.expanded = self.is_terminal
        
        # initialise the current node's parent node if exist
        self.parent = parent

        # initialize the number of visits of this node
        self.visits = 0

        # initilize the score of the current node
        self.score = 0

        # initalize the current node's children
        self.children = {}

# applicate the Monte Carlo Tree Search algorithm
class MCTS():
    def __init__(self, level):
        self.level = level

    # search for the best move in the current state
    def search(self, initial_state, move):
        # initialize the root node
        self.root = TreeNode(initial_state, None, move)

        # walk through 1000 iteration
        for i in range(int(self.level*10)):

            # select the node (selection phase)
            node = self.select(self.root)

            # score current node (simulation phase)
            score = self.rollout(node.board)

            # backpropagate the result
            self.backpropagate(node, score)
        
        # get the best move in the current state
        try:
            # return the best move between the node children
            return self.get_best_move(self.root, 0)
        except:
            # return the initial state entred
            return node

    # select the best move
    def select(self, node):
        # make sure that we're dealing with non-terminal node
        while not node.is_terminal:
            # case where the node is fully expanded
            if node.expanded:
                node = self.get_best_move(node, 2)

            # case where the node is not fully expanded
            else:
                # otherwise expand the node
                return self.expand(node)
            
        # return node
        return node
    
    # expand node
    def expand(self, node):
        # generate legal states (moves) for the given node
        states, moves = node.board.generate_states()

        # loop over generated states
        for state, move in zip(states, moves):
            #make sure that current state (move) is not present in child nodes
            if str(state.state) not in node.children:
                # create a new node
                new_node = TreeNode(state, node, move)

                # add child node to prent's node children list (dict)
                node.children[str(state.state)] = new_node

                # case when node is fully expanded
                if len(states) == len(node.children):
                    node.expanded = True

                # return newly created node
                return new_node
            
        # debugging
        print("Shouldn't get here!!")

    # simulate the game by making random movement untile reaching a terminal node
    def rollout(self, board):
        # make random moves for both sides until terminal state of the game is reached
        while not board.is_win():
            # try to make move
            try:
                # make the on board
                board = np.random.choice(board.generate_states())

            # no moves available
            except:
                # return a draw score
                return 0

        # return score from the player 'x' perspective
        if board.player_2 == 'X':
            return 1
        elif board.player_2 == 'O':
            return -1

    # back-propagate the score and the number of visits up to the root node
    def backpropagate(self, node, score):
        # update node's up to root node
        while node is not None:
            # update node's visits
            node.visits += 1

            # update node's score
            node.score += score

            # set node to parent
            node = node.parent

    # select the best move based on the UCB1 formula
    def get_best_move(self, node, exploration_rate):
        # define best score and best moves
        best_score = float('-inf')
        best_moves = []

        # loop over child nodes
        for child in node.children.values():
            # define current player
            if child.board.player_2 == 'X': current_player = 1
            elif child.board.player_2 == 'O': current_player = -1

            # get move score using UCT formula
            move_score = current_player * child.score / child.visits + exploration_rate * math.sqrt(math.log(node.visits / child.visits))

            # if better move has been found
            if move_score > best_score:
                best_score = move_score
                best_moves = [child]

            # found as good move as already available
            elif move_score == best_score:
                best_moves.append(child)

        # return one of the best moves randomly
        return np.random.choice(best_moves)