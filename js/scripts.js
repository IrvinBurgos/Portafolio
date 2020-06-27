// cargar código de jquery cuando haya cargado el sitio web
$(document).ready(main);

function main() {
  // menú hamburgueza
  $("#toggle-menu").click(function() {
    $("#main-nav").slideToggle();
    $(window).resize(function() {
      if(window.innerWidth > 960) {
        $("#main-nav").removeAttr("style");
      }
    });
  });

  // one page nav efecto de dezplazamiento y menú activo
  $('#main-menu').onePageNav();
}

//wow animaciones de scroll
new WOW().init();

// mixitup filtro del portafolio
const mixer = mixitup(".projects-container", {
  animation: {
    duration: 250,
    nudge: true,
    reverseOut: false,
    effects: "fade rotateZ(180deg) stagger(30ms)"
  }
});