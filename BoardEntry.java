public class BoardEntry{
	private boolean isDiscovered;
	private boolean[] potentialValues;	//[1, 2, 3, 4, 5, 6, 7, 8 ,9] indices are index-1
	private int entryValue;	

	public BoardEntry(){
		this(-1);
	}

	public BoardEntry(int inputValue){
		this.isDiscovered = inputValue == -1 ? false : true;
		this.potentialValues = new boolean[9];
		this.entryValue = inputValue;

		for(int i = 0; i < 9; i++){
			potentialValues[i] = false;
		}
	}

	public void setValue(int inputValue){
		this.isDiscovered = true;
		this.entryValue = inputValue;
		
		return;
	}

	public void setPotentialValue(int i){
		this.potentialValues[i] = true;
	}

	public void setNonPotentialValue(int i){
		this.potentialValues[i] = false;
	}

	public boolean[] getPotentialValues(){
		return this.potentialValues;
	}

	public boolean getIsDiscovered(){ return this.isDiscovered; }

	public int getValue(){ return this.entryValue; }

	public void setIsDiscovered(boolean val){ this.isDiscovered = val; }

}
