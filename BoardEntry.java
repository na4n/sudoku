public class BoardEntry{
	private boolean isDiscovered;
	private boolean[] potentialValues;
	private int entryValue;		

	public BoardEntry(){
		this(-1);
	}

	public BoardEntry(int inputValue){
		this.isDiscovered = true;
		this.potentialValues = new boolean[10];
		this.entryValue = inputValue;

		for(int i = 0; i < 10; i++){
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

	public boolean[] getPotentialValues(){
		return this.potentialValues;
	}

	public boolean getIsDiscovered(){ return this.isDiscovered; }

	public int getValue(){ return this.entryValue; }

}
