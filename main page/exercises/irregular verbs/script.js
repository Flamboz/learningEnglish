window.onload = function() {
  initArr = []

  // ЧАСТИНА ВИТЯГУВАННЯ ДАНИХ З БД 

  $.ajax({
	  type: "POST",
	  url: "../get.php",
	  dataType: "json",
	  success: function (data) {
			console.log(data)
			for(let i = 0; i < data.length; i++)
				initArr.push(data[i][1])
	  }
  }).promise().done(function(){
	const divUkrWord = document.getElementById('translation')
	const divIrrVerbsWrapper = document.getElementById('irrVerbs-wrapper')
  
	let arr
	let irrVerb
	let formsOfIrrVerb
	let translation
	let randomInt
  
	var globalI = 0
  
	
	irrVerbs(globalI)
  
  
	function irrVerbs (i) {
	  if(globalI < initArr.length) {
		arr = initArr[globalI].split("/")
		irrVerb = arr[0]
		formsOfIrrVerb = irrVerb.split(',')
		translation = arr[1]
		divUkrWord.textContent = translation
		createEmptyInputs()
		insertOneVerbInInput()
		
		document.getElementById('btn').onclick = function() {
		  let checkForm1 = document.querySelector('.form1')
		  let checkForm2 = document.querySelector('.form2')
		  let checkForm3 = document.querySelector('.form3')
  
		  if(checkForm1.value == formsOfIrrVerb[0] &&
			checkForm2.value == formsOfIrrVerb[1] &&
			checkForm3.value == formsOfIrrVerb[2]) {
			checkIfWeReachedExerciseEnd()
			clearPageForNewWord()
			globalI++
			correctAnswerShow()
		  }else {
			incorrectAnswerShow()
		  } 
		} 
	  }
	}
  
  
	function getRandomInt(min, max) {
	  let rand = min + Math.random() * (max - min);
	  return Math.round(rand);
	}
  
	function createEmptyInputs() {
	  for(i = 1; i <= 3; i++) {
		let emptyInput = document.createElement('input')
		emptyInput.classList.add('empty-input')
		emptyInput.setAttribute('type', 'text')
		emptyInput.classList.add('form' + [i])
		divIrrVerbsWrapper.appendChild(emptyInput)
	  }
	}
  
	function insertOneVerbInInput() {
	  randomInt = getRandomInt(0,2)
	  let form1 = document.getElementsByClassName('form1')[0]
	  let form2 = document.getElementsByClassName('form2')[0]
	  let form3 = document.getElementsByClassName('form3')[0]
	  if (randomInt == 0) {
		form1.setAttribute('value', formsOfIrrVerb[0])
		form1.setAttribute('readonly', 'readonly')
	  }
	  if (randomInt == 1) {
		form2.setAttribute('value', formsOfIrrVerb[1])
		form2.setAttribute('readonly', 'readonly')
	  }
	  if (randomInt == 2) {
		form3.setAttribute('value', formsOfIrrVerb[2])
		form3.setAttribute('readonly', 'readonly')
	  }
	}
  
	function allDone() {
	  document.getElementById('wrapper').classList.add('hidden')
	  document.getElementById('everth-correct').classList.remove('hidden')
	}
	function checkIfWeReachedExerciseEnd () {
	  if(globalI == initArr.length - 1) {
		allDone()
		return
	  }
	}
  
	function clearPageForNewWord() {
	  let divIrrVerbsWrapper = document.getElementById('irrVerbs-wrapper')
	  divIrrVerbsWrapper.innerHTML = ""
	}
  
	function correctAnswerShow() {
	  if(document.getElementById('correctAnswerShow')) {
		document.getElementById('correctAnswerShow').classList.add('correctAnswerShow')
		setTimeout(() => {
		  document.getElementById('correctAnswerShow').classList.remove('correctAnswerShow')}, 1000);
		irrVerbs(globalI)
	  }
	}
  
	function clearIncorrectInputs() {
	  let checkForm1 = document.querySelector('.form1')
	  let checkForm2 = document.querySelector('.form2')
	  let checkForm3 = document.querySelector('.form3')
	  let removeClassInInput = document.getElementsByTagName('input')
	  for (let i = 0; i < 3; i++) {
		removeClassInInput[i].classList.remove('incorrect')
	  }
  
	  if (checkForm1.value != formsOfIrrVerb[0]) {
		checkForm1.classList.add('incorrect')
	  }
	  if (checkForm2.value != formsOfIrrVerb[1]) {
		checkForm2.classList.add('incorrect')
	  }
	  if (checkForm3.value != formsOfIrrVerb[2]) {
		checkForm3.classList.add('incorrect')
	  }
  
	  if (checkForm1.classList.contains('incorrect')) {
		checkForm1.value = ""
	  } 
	  if (checkForm2.classList.contains('incorrect')) {
		checkForm2.value = ""
	  } 
	  if (checkForm3.classList.contains('incorrect')) {
		checkForm3.value = ""
	  }
	}
	function incorrectAnswerShow() {
	  if(document.getElementById('incorrectAnswerShow') && document.getElementById('incorrectAnswerShow')) {
		document.getElementById('incorrectAnswerShow').classList.add('incorrectAnswerShow')
		setTimeout(() => 
		document.getElementById('incorrectAnswerShow').classList.remove('incorrectAnswerShow'), 1000);
	  }
	  setTimeout(() => clearIncorrectInputs(), 500);
	}
  
  })
}