import java.lang.StringBuilder;
import java.util.Arrays;
import java.util.HashMap;

public class Board{
	private BoardEntry[] rawBoard;
	private BoardEntry[][] columnBoard;
	private BoardEntry[][] rowBoard;
	public BoardEntry[][] squareBoard;
	HashMap<Integer, Boolean> foundValues = new HashMap<Integer, Boolean>();

	Board(int[] inputBoard){
		this.rawBoard = new BoardEntry[81];
		this.columnBoard = new BoardEntry[9][9];
		this.rowBoard = new BoardEntry[9][9];
		this.squareBoard = new BoardEntry[9][9];

		for(int i = 0; i < inputBoard.length; i++){
			this.rawBoard[i] = new BoardEntry(inputBoard[i]);
		}

		for(int i = 0; i < 10; i++){
			this.foundValues.put(i, false);
		} 
		this.foundValues.put(-1, false);

		makeColumnBoard();
		makeRowBoard();
		makeSquareBoard();
	}

	private static int[] columnMapping(int rawIndex){
		return new int[] {rawIndex % 9, rawIndex / 9};
	}

	private static int[] rowMapping(int rawIndex){
		return new int[] {rawIndex / 9, rawIndex % 9};
	}

	private static int[] squareMapping(int rawIndex){
		int column = rowMapping(rawIndex)[1];
		int row = columnMapping(rawIndex)[1];

		return new int[] {(row/3)*3+(column/3), column%3+((row%3)*3)};	// comes from makeSquareBoard;
	}

	private void makeColumnBoard(){
		for(int i = 0; i < 9; i++){
			for(int j = 0; j < 9; j++){
				this.columnBoard[i][j] = this.rawBoard[i+j*9];
			}	
		}
		return;
	}

	private void makeRowBoard(){
		for(int i = 0; i < 9; i++){
			for(int j = 0; j < 9; j++){
				this.rowBoard[i][j] = this.rawBoard[i*9+j];
			}
		}
		return;
	}

	private void makeSquareBoard(){	
		for(int i = 0; i < 9; i++){
			for(int j = 0; j < 9; j++){
				this.squareBoard[(i/3)*3+(j/3)][j%3+((i%3)*3)] = this.rawBoard[i*9+j];	// it works don't ask
			}
		}
		return;
	}

	public boolean validBoard(){
		HashMap<Integer, Boolean> clean;		
		int[] columnPair;
		int[] rowPair;
		int[] squarePair;
		int val;

		for(int i = 0; i < 81; ++i){
			columnPair = columnMapping(i);
			rowPair = rowMapping(i);
			squarePair = squareMapping(i);

			clean = new HashMap<Integer, Boolean>(this.foundValues);
			for(int j = 0; j < 9; ++j){
				val = this.columnBoard[columnPair[0]][j].getValue();
				if(val != -1){	
					if(clean.get(val) == true){		
						return false;
					}
					
					clean.put(val, true);
				}
			}

			clean = new HashMap<Integer, Boolean>(this.foundValues);
			for(int j = 0; j < 9; ++j){
				val = this.rowBoard[rowPair[0]][j].getValue();
				if(val != -1){	
					if(clean.get(val) == true){		
						return false;
					}
					
					clean.put(val, true);
				}
			}

			clean = new HashMap<Integer, Boolean>(this.foundValues);
			for(int j = 0; j < 9; ++j){
				val = this.squareBoard[squarePair[0]][j].getValue();
				if(val != -1){	
					if(clean.get(val) == true){		
						return false;
					}
					
					clean.put(val, true);
				}
			}
		}

		return true;
	}

	public void findPotentialValues(){	//fix potentialValues
		HashMap<Integer, Boolean> clean;		
		int[] columnPair;
		int[] rowPair;
		int[] squarePair;
		int val;

		for(int i = 0; i < 81; ++i){
			if(this.rawBoard[i].getIsDiscovered()){
				continue;
			}
			
			columnPair = columnMapping(i);
			rowPair = rowMapping(i);
			squarePair = squareMapping(i);

			clean = new HashMap<Integer, Boolean>(this.foundValues);
			for(int j = 0; j < 9; ++j){
				val = this.columnBoard[columnPair[0]][j].getValue();
				if(val != -1){						
					clean.put(val-1, true);
				}
			}

			for(int j = 0; j < 9; ++j){
				val = this.rowBoard[rowPair[0]][j].getValue();
				
				if(val != -1){
					clean.put(val-1, true);
				}
			}

			for(int j = 0; j < 9; ++j){
				val = this.squareBoard[squarePair[0]][j].getValue();
				if(val != -1){
					clean.put(val-1, true);
				}
			}

			for(int k = 0; k < 9; k++){
				if(clean.get(k) == false){
					this.rawBoard[i].setPotentialValue(k);
				}
				else{
					this.rawBoard[i].setNonPotentialValue(k);
				}
			}
		}

		return;
	}

	public boolean passThrough(){	//fix potentialValues
		return potentialPass();
	}

	private boolean potentialPass(){
		boolean change = false;
		
		boolean[] possible;
		boolean one_found = false;
		int one = -1;

		for(int i = 0; i < 81; i++){
			if(this.rawBoard[i].getIsDiscovered() == true){
				continue;
			}

			one_found = false;
			one = -1;
			possible = this.rawBoard[i].getPotentialValues();


			for(int j = 0; j < possible.length; j++){
				if(possible[j] == true){
					if(one_found == false){
						one_found = true;
						one = j+1;
					}
					else if(one_found == true){
						one_found = false;
						break;
					}
				}
			}

			if(one_found){
				this.rawBoard[i].setValue(one);
				this.rawBoard[i].setIsDiscovered(true);
				change = true;
			}
		}

		return change;
	}

	// private boolean numberPass(int i){	//looks through i

	// }

	// private int numMap(int v, int a){
		
	// }

	// public void numberPass(int i){
	// 	boolean[] locations = new boolean[9];

	// 	for(int i = 0; i < 9; i++){	// initial pass through to find if 1 exists
	// 		for(int j = 0; j < 9; j++){
	// 			if(this.squareBoard[i][j].getValue() == i){
	// 				locations[i] = true;
	// 				break;
	// 			}
	// 		}
	// 	}

	// 	0	1	2
	// 	3	4	5 	(+/- 1/2)
	// 	6	7	8
		
	// 	(+/- 3/6)

	// 	for(int i = 0; i < 9; i++){

	// 	}

	// 	return
	// }

	public void solveIterable(){
		findPotentialValues();

		while(passThrough() == true){
			findPotentialValues();
		}

		return;
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
    		6,-1,-1,-1,-1,-1,8,-1,-1,
			-1,-1,3,-1,-1,-1,7,2,-1,
			1,-1,-1,-1,-1,6,-1,4,-1,
			-1,8,6,-1,9,7,-1,-1,4,
			-1,-1,9,-1,-1,2,-1,-1,-1,
			-1,-1,4,5,-1,8,9,-1,-1,
			-1,-1,1,-1,-1,5,-1,7,-1,
			-1,-1,5,-1,3,4,-1,-1,-1,
			-1,-1,7,-1,-1,-1,-1,3,8
		};

		Board myBoard = new Board(testBoard);
		
		System.out.println(myBoard);
		myBoard.solveIterable();
		System.out.println();		
		System.out.println(myBoard);

	}
	
}


/* 	
	00 01 02  03 04 05  06 07 08
  	09 10 11  12 13 14  15 16 17
  	18 19 20  21 22 23  24 25 26
   
  	27 28 29  30 31 32  33 34 35
  	36 37 38  39 40 41  42 43 44
  	45 46 47  48 49 50  51 52 53
  
  	54 55 56  57 58 59  60 61 62
  	63 64 65  66 67 68  69 70 71
  	72 73 74  75 76 77  78 79 80
 
	EASY test case
	-1,-1,9,-1,-1,2,-1,-1,5,
	5,3,8,-1,6,4,-1,-1,9,
	1,6,2,-1,-1,-1,-1,3,-1,
	-1,-1,3,-1,2,7,-1,-1,-1,
	-1,5,4,6,-1,-1,1,-1,-1,
	-1,-1,7,-1,1,5,3,4,-1,
	3,-1,-1,8,-1,1,9,-1,6,
	7,-1,-1,3,-1,-1,8,5,-1,
	-1,9,1,-1,-1,-1,4,7,-1

	HARD test case
	6,-1,-1,-1,-1,-1,8,-1,-1,
	-1,-1,3,-1,-1,-1,7,2,-1,
	1,-1,-1,-1,-1,6,-1,4,-1,
	-1,8,6,-1,9,7,-1,-1,4,
	-1,-1,9,-1,-1,2,-1,-1,-1,
	-1,-1,4,5,-1,8,9,-1,-1,
	-1,-1,1,-1,-1,5,-1,7,-1,
	-1,-1,5,-1,3,4,-1,-1,-1,
	-1,-1,7,-1,-1,-1,-1,3,8
*/