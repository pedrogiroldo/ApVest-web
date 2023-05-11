const interrogacaoIcon = document.getElementById("interrogacaoIcon");
const popup = document.getElementById("popup");
const close = document.getElementsByClassName("close")[0];

interrogacaoIcon.addEventListener("click", function() {
  const doc = "https://github.com/pedrogiroldo/ApVest-web/wiki/Documenta%C3%A7%C3%A3o-v1.5.0"
  window.open(doc, "_blank")
});
