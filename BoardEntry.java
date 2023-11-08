public class BoardEntry{
	boolean isDiscovered;
	int[] potentialValues;
	int entryValue;		

	public BoardEntry(){
		this(-1);
	}

	public BoardEntry(int inputValue){
		this.isDiscovered = true;
		this.potentialValues = new int[9];
		this.entryValue = inputValue;
	}

	public void setValue(int inputValue){
		this.isDiscovered = true;
		this.entryValue = inputValue;
		
		return;
	}

	public int getValue(){ return this.entryValue; }

}
