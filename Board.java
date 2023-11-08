import java.lang.StringBuilder;
import java.util.Arrays;

public class Board{
	private BoardEntry[] rawBoard;
	private BoardEntry[][] columnBoard;
	private BoardEntry[][] rowBoard;
	public BoardEntry[][] squareBoard;

	Board(int[] inputBoard){
		this.rawBoard = new BoardEntry[81];
		this.columnBoard = new BoardEntry[9][9];
		this.rowBoard = new BoardEntry[9][9];
		this.squareBoard = new BoardEntry[9][9];

		for(int i = 0; i < inputBoard.length; i++){
			this.rawBoard[i] = new BoardEntry(inputBoard[i]);
		}

		makeColumnBoard();
		makeRowBoard();
		makeSquareBoard();
	}

	private void makeColumnBoard(){
		for(int i = 0; i < 9; i++){
			for(int j = 0; j < 9; j++){
				this.columnBoard[i][j] = this.rawBoard[i+j*9];
			}	
		}
	}

	private void makeRowBoard(){
		for(int i = 0; i < 9; i++){
			for(int j = 0; j < 9; j++){
				this.rowBoard[i][j] = this.rawBoard[i*9+j];
			}
		}
	}

	private void makeSquareBoard(){		
		for(int i = 0; i < 9; i++){
			for(int j = 0; j < 9; j++){
				this.squareBoard[(i/3)*3+(j/3)][j%3+((i%3)*3)] = this.rawBoard[i*9+j];	// most insane line of code I've written
			}
		}


	}

	@Override
	public String toString() {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 81; i += 9) {
            BoardEntry[] row = Arrays.copyOfRange(this.rawBoard, i, i + 9);

            for (int j = 0; j < 9; j++) {
				String appendValue = row[j].getValue() == -1 ? "*" : String.valueOf(row[j].getValue());
				sb.append(appendValue);
				sb.append(" ");
            }
			
			if(i < 72){
				sb.append("\n");
			}		
		}

        return sb.toString();
    }

	public static void main(String[] args){
		int[] testBoard = {
    		5, 3, -1, -1, 7, -1, -1, -1, -1,
    		6, -1, -1, 1, 9, 5, -1, -1, -1,
    		-1, 9, 8, -1, -1, -1, -1, 6, -1,
    		8, -1, -1, -1, 6, -1, -1, -1, 3,
    		4, -1, -1, 8, -1, 3, -1, -1, 1,
    		7, -1, -1, -1, 2, -1, -1, -1, 6,
			-1, 6, -1, -1, -1, -1, 2, 8, -1,
			-1, -1, -1, 4, 1, 9, -1, -1, 5,
	    	-1, -1, -1, -1, 8, -1, -1, 7, 9
		};

		Board myBoard = new Board(testBoard);
		System.out.println(myBoard);

	}
}
