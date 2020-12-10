let initArr = []
$.ajax({
	type: "POST",
	url: "../get.php",
	dataType: "json",
	success: function (data) {
	  console.log(data)
	  for(let i = 0; i < data.length; i++)
		  if(data[i][2] != "")
		  	initArr.push(data[i][2])
	}
}).promise().done(function(){
	function shuffle(words) {
	let res = words.sort(function(){
	  return Math.random() - 0.5;
	})
  }
  
  let words
  let wordsCopy
  let checkSentence = ""
  
  let letters = document.getElementsByClassName('word-cell')
  let emptyCell = document.getElementsByClassName('empty-cell');
  
  var globalI = 0
  var curWordInSentence = 0 
  
  makeSentence(globalI)
  
  function makeSentence(i) {
	if(globalI < initArr.length) {
	  arr = initArr[i].split("/") 
	  words = arr[0].split(" ")
	  wordsCopy = arr[0].split(" ")
	  document.getElementById('text').textContent = arr[1]
	  shuffle(words)
	  create()
  
	  curWordInSentence = 0
	  checkSentence = ""
  
	  for (let i=0; i < letters.length; i++) {
		letters[i].onclick = function(){
		  insertLetter(i)
  
		  if (curWordInSentence == letters.length) {
			if (checkSentence == wordsCopy.join("")) {
			  checkIfReachedExerciseEnd()
			  clearPageForNewWord()
			  correctCurWord ()
			}
			else 
			  incorrectCurWord()
		  } 
		}
	  }
	}
  }
  
  
  function create() {
	let cellsWrapper = document.getElementById('cells-wrapper')
	for (let i = 1; i <= words.length; i++ ) {
		let emptyCell = document.createElement('div');
		emptyCell.classList.add('empty-cell')
		cellsWrapper.appendChild(emptyCell);
	}
  
	let wordsWrapper = document.getElementById('words-wrapper')
	for (let i = 1; i <= words.length; i++ ) {
		let wordCell = document.createElement('div');
		wordCell.classList.add('word-cell')
		wordsWrapper.appendChild(wordCell);
		let letters = document.getElementsByClassName('word-cell')
		for(let i = 0; i < letters.length; i++) {
		  letters[i].textContent = words[i]
		}
	}
  }
  
  function insertLetter(i) {
	emptyCell[curWordInSentence].textContent = letters[i].textContent
	checkSentence += letters[i].textContent
	letters[i].classList.add('deleted')
	curWordInSentence++
  }
  
  function allDone() {
	document.getElementById('wrapper').classList.add('hidden')
	document.getElementById('all-done').classList.remove('hidden')
  }
  function checkIfReachedExerciseEnd() {
	if(globalI == initArr.length - 1) {
	  allDone()
	  return
	}
  }
  
  function clearPageForNewWord() {
	let cellsWrapper = document.getElementById('cells-wrapper')
	let wordsWrapper = document.getElementById('words-wrapper')
	if(cellsWrapper && wordsWrapper) {
	  cellsWrapper.innerHTML = ""
	  wordsWrapper.innerHTML = ""
	}
  }
  
  function correctCurWord() {
	if(document.getElementById('correctAnswerShow') && document.getElementById('correctAnswerShow')) {
	  document.getElementById('correctAnswerShow').classList.add('correctAnswerShow')
	  globalI++
	  setTimeout(() => 
	  document.getElementById('correctAnswerShow').classList.remove('correctAnswerShow'), 1000);
	  makeSentence(globalI)
	}
  }
  
  function clearCellsToTryAgain() {
	shuffle(words)
	for(let i = 0; i < letters.length; i++) {
	  emptyCell[i].textContent = ""
	  letters[i].classList.remove('deleted')
	  letters[i].textContent = words[i]
	}
  }
  function incorrectCurWord() {
	checkSentence = ""
	curWordInSentence = 0
	if(document.getElementById('incorrectAnswerShow') && document.getElementById('incorrectAnswerShow')) {
	  document.getElementById('incorrectAnswerShow').classList.add('incorrectAnswerShow')
	  setTimeout(() => 
	  document.getElementById('incorrectAnswerShow').classList.remove('incorrectAnswerShow'), 1000);
	}
	setTimeout(() => clearCellsToTryAgain(), 500);
  }
  
  
})
