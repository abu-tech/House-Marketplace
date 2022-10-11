$(window).on("load", function() {
    $(".loader-wrapper").fadeOut("slow");
  });
  const loadingSquare = document.querySelector('.loader-wrapper');
  document.body.onbeforeunload = () => {
    loadingSquare.style.display = "flex";
  };