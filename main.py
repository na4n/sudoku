import boared

def col_board_rep(board):
    out = []
    for i in range(9):
	
        out.append([board[i], board[i+9], board[i+18], board[i+27],
	        board[i+36], board[i+45], board[i+54], board[i+63],
	        board[i+72]])
    
    return out    


def main(raw_board):
    b = boared.Board(col_board_rep(raw_board), 1)
    print(b)

if __name__ == "__main__":
   raw_board = [5, 3, '*', '*', 7, '*', '*', '*', '*',6, '*', '*', 1, 9, 5, '*', '*', '*','*', 9, 8, '*', '*', '*', '*', 6, '*',8, '*', '*', '*', 6, '*', '*', '*', 3,4, '*', '*', 8, '*', 3, '*', '*', 1,7, '*', '*', '*', 2, '*', '*', '*', 6,'*', 6, '*', '*', '*', '*', 2, 8, '*','*', '*', '*', 4, 1, 9, '*', '*', 5,'*', '*', '*', '*', 8, '*', '*', 7, 9]


   main(raw_board)

