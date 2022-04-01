const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("#searching");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if (SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  const micBtn = searchForm.querySelector("#micro");

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    recognition.start(); // First time you have to allow access to mic!
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    if (transcript.toLowerCase().trim() === "stop recording") {
      recognition.stop();
    } else if (!searchFormInput.value) {
      searchFormInput.value = transcript;
    } else {
      if (transcript.toLowerCase().trim() === "go") {
        searchForm.submit();
      } else if (transcript.toLowerCase().trim() === "reset input") {
        searchFormInput.value = "";
      } else {
        searchFormInput.value = transcript;
      }
    }
  }
}
