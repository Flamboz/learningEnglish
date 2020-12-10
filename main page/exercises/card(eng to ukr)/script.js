arr = []

$.ajax({
	type: "POST",
	url: "../get.php",
	dataType: "json",
	success: function (data) {
	  console.log(data)
	  for(let i = 0; i < data.length; i++)
		  if(data[i][3] != "")
		  	arr.push(data[i][3])
	}
}).promise().done(function(){
	const cardDiv = document.getElementById('card');
	const cardDivUkrText = document.getElementById('card__ukrText')
	const cardDivEngText = document.getElementById('card__engText')
	const cardDivLine = document.getElementById('card__line')
	let wordCount = 0 // для проходження слів в arr
	// перше слово
	let word = arr[wordCount].split("/") // розділяю перший елемент масиву на 2 піделементи, елемент що до "/" і елемент що після "/""
	let engWord = cardDivEngText.textContent = word[0] // перший піделемент(слово на англ) для картки англ => укр
	
	// бот, що читає слово на англ
	const speechSynthesis = window.speechSynthesis;
	const voicesSelect = document.getElementById('voice')
	let engVoice;
	
	function generateVoice() {
	  engVoice = speechSynthesis.getVoices().map((index) => voice.voiceURI === 'Google US English')
	}
	function speak(word) {
	  if (word !== '') {
		const ssUtterance = new SpeechSynthesisUtterance(word) 
		
		ssUtterance.voice = engVoice[voicesSelect.value]
	
		speechSynthesis.speak(ssUtterance)
	  }
	}
	
	// всі наступні слова
	document.getElementById('btn').onclick = function() { // при натисканні на кнопку, переміщаємся на наступну картку
	  wordCount++ // переміщуюсь по словам в arr
	
	  if (wordCount < arr.length) {
		cardDivUkrText.textContent = "" // щоб ховалося укр слово з попередньої карточки
			
		word = arr[wordCount].split("/") // розділяю інші елементи масиву на 2 піделементи
		engWord = cardDivEngText.textContent = word[0] // перший піделемент(слово на англ)
	
	
		cardDivLine.classList.remove('card__line');       // при натисканні кнопки забираю рисочку
		cardDivUkrText.classList.remove('card__ukrText'); // і попередній переклад слова
	  
	
	  } else { // забираю картку на сторінці і добавляю надпис про пройдення карток
		document.getElementById('wrapper', 'btn').classList.add('hidden')
		document.getElementById('all-done').classList.remove('hidden')
	  }
	} 
	
	
	cardDiv.onclick = function() { // при натисканні на картку показую переклад слова та рисочку
	  cardDivLine.classList.add('card__line'); 
	  cardDivUkrText.classList.add('card__ukrText');
	  cardDivUkrText.textContent = word[1] // другий піделемент(переклад)
	  speak(engWord)
	}
	
	generateVoice()
})
