project : Board.java BoardEntry.java
	javac Board.java

run: Board.class
	java Board

clean:
	rm -f *.class

