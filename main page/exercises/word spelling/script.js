var initArr = []

$.ajax({
	type: "POST",
	url: "../get.php",
	dataType: "json",
	success: function (data) {
	  console.log(data)
	  for(let i = 0; i < data.length; i++)
		  if(data[i][3] != "")
		  	initArr.push(data[i][3])
	}
}).promise().done(function(){
	function shuffle(word) {
	  let res = word.sort(function(){
		return Math.random() - 0.5;
	  })
	}
	
	let word 
	let engLetters
	let engWordCopy
	let wordCheck = ""
	
	let letters = document.getElementsByClassName('letter-cell')
	let emptyCell = document.getElementsByClassName('empty-cell');
	
	var globalI = 0
	var currentLetterInWord = 0 
	
	wordSpell(globalI)
	
	function wordSpell (i) {
	  if(globalI < initArr.length) {
		word = initArr[i].split("/") 
		engLetters = word[0].split("")
		engWordCopy = word[0].split("")
		document.getElementById('text').textContent = word[1]
		shuffle(engLetters)
		create()
	
		currentLetterInWord = 0
		wordCheck = ""
	
		for (let i=0; i < letters.length; i++) {
		  letters[i].onclick = function(){
			insertLetter(i)
	
			if (currentLetterInWord == letters.length) {
			  if (wordCheck == engWordCopy.join("")) {
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
	  let engWrapper = document.getElementById('eng-wrapper')
	  for (let i = 1; i <= engLetters.length; i++ ) {
		  let emptyCell = document.createElement('div');
		  emptyCell.classList.add('empty-cell')
		  engWrapper.appendChild(emptyCell);
	  }
	
	  let ukrWrapper = document.getElementById('ukr-wrapper')
	  for (let i = 1; i <= engLetters.length; i++ ) {
		  let letterCell = document.createElement('div');
		  letterCell.classList.add('letter-cell')
		  ukrWrapper.appendChild(letterCell);
		  let letters = document.getElementsByClassName('letter-cell')
		  for(let i = 0; i < letters.length; i++) {
			letters[i].textContent = engLetters[i]
		  }
	  }
	}
	
	function insertLetter (i) {
	  emptyCell[currentLetterInWord].textContent = letters[i].textContent
	  wordCheck += letters[i].textContent
	  letters[i].classList.add('deleted')
	  currentLetterInWord++
	}
	
	function allDone() {
	  document.getElementById('wrapper').classList.add('hidden')
	  document.getElementById('all-done').classList.remove('hidden')
	}
	function checkIfReachedExerciseEnd () {
	  if(globalI == initArr.length - 1) {
		allDone()
		return
	  }
	}
	
	function clearPageForNewWord() {
	  let engWrapper = document.getElementById('eng-wrapper')
	  let ukrWrapper = document.getElementById('ukr-wrapper')
	  if(engWrapper && ukrWrapper) {
		engWrapper.innerHTML = ""
		ukrWrapper.innerHTML = ""
	  }
	}
	
	function correctCurWord () {
	  if(document.getElementById('correctAnswerShow')) {
		document.getElementById('correctAnswerShow').classList.add('correctAnswerShow')
		globalI++
		setTimeout(() => 
		document.getElementById('correctAnswerShow').classList.remove('correctAnswerShow'), 1000);
		wordSpell(globalI)
	  }
	}
	
	function clearCellsToTryAgain() {
	  shuffle(engLetters)
	  for(let i = 0; i < letters.length; i++) {
		emptyCell[i].textContent = ""
		letters[i].classList.remove('deleted')
		letters[i].textContent = engLetters[i]
	  }
	}
	function incorrectCurWord () {
	  wordCheck = ""
	  currentLetterInWord = 0
	  if(document.getElementById('incorrectAnswerShow') && document.getElementById('incorrectAnswerShow')) {
		document.getElementById('incorrectAnswerShow').classList.add('incorrectAnswerShow')
		setTimeout(() => 
		document.getElementById('incorrectAnswerShow').classList.remove('incorrectAnswerShow'), 1000);
	  }
	  setTimeout(() => clearCellsToTryAgain(), 500);
	}
})
