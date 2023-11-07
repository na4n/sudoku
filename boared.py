class Board:
    def __init__(self, board, boardtype):
        self.board = board
        self.boardtype = boardtype

    def __str__(self):
        strng = ""

        if self.boardtype == 1:
            for i in range(9):
                strng += ((str(self.board[0][i])) + " ")          
                strng += ((str(self.board[1][i])) + " ")          
                strng += ((str(self.board[2][i])) + " ")
                strng += ((str(self.board[3][i])) + " ")
                strng += ((str(self.board[4][i])) + " ")
                strng += ((str(self.board[5][i])) + " ")
                strng += ((str(self.board[6][i])) + " ")
                strng += ((str(self.board[7][i])) + " ")
                strng += ((str(self.board[8][i])) + " ")
                strng += "\n"
        
            return strng
                   
        else:
            return "not ready"
    