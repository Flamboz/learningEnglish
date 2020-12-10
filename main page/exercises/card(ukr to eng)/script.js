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
// для зміни піделементів місцями, тобто apple/яблуко => яблуко/apple
for(let i = 0; i < arr.length; i++) {
	let w = arr[i].split("/");
	[w[0],w[1]] = [w[1],w[0]]
	arr[i] = w.join("/")
  }
  
  const cardDiv = document.getElementById('card');
  const cardDivUkrText = document.getElementById('card__ukrText')
  const cardDivEngText = document.getElementById('card__engText')
  const cardDivLine = document.getElementById('card__line')
  let wordCount = 0 // для проходження слів в arr
  // перше слово
  let word = arr[wordCount].split("/") // розділяю перший елемент масиву на 2 піделементи, елемент що до "/" і елемент що після "/""
  let ukrWord = cardDivUkrText.textContent = word[0] // перший піделемент(слово на укр) для картки укр => англ
  
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
			cardDivEngText.textContent = "" // щоб ховалося англ слово з попередньої карточки
				
			word = arr[wordCount].split("/") // розділяю інші елементи масиву на 2 піделементи
			ukrWord = cardDivUkrText.textContent = word[0] // перший піделемент(слово на укр)
		
		
			cardDivLine.classList.remove('card__line');       // при натисканні кнопки забираю рисочку
			cardDivEngText.classList.remove('card__engText'); // і попереднє слово на англ
		
		
		} else { // забираю картку на сторінці і добавляю надпис про пройдення карток
			document.getElementById('wrapper', 'btn').classList.add('hidden')
			document.getElementById('all-done').classList.remove('hidden')
		}
  } 
  
  
  cardDiv.onclick = function() { // при натисканні на картку показую переклад слова та рисочку
	cardDivLine.classList.add('card__line'); 
	cardDivEngText.classList.add('card__engText');
	cardDivEngText.textContent = word[1] // другий піделемент(слово на англ)
	speak(word[1])
  }
  
  generateVoice()
  
  
})
