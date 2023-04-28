const interrogacaoIcon = document.getElementById("interrogacaoIcon");
const popup = document.getElementById("popup");
const close = document.getElementsByClassName("close")[0];

interrogacaoIcon.addEventListener("click", function() {
  popup.style.display = "block";
});

close.addEventListener("click", function() {
  popup.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
});
