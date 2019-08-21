window.onload = () => {
  const isMobile = () => {
    const mobileUAs = ["android", "ios"];
    const currentUserAgent = navigator.userAgent.toLowerCase();
    return new RegExp(mobileUAs.join("|")).test(currentUserAgent)
  }

  const buildShockingElement = () => {
    const img = document.createElement("img");
    const aiai = new Audio("aiai.mp3");
    img.src = "uva.png";
    img.alt = "Aqui do lado, Pederneiras";
    img.ontouchstart = (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      aiai.play();
      navigator.vibrate(1000);
    }
    img.ontouchend = (ev) => {
      navigator.vibrate();
    }
    img.ontouchcancel = (ev) => {
      navigator.vibrate();
    }
    document.getElementById("app").insertAdjacentElement("beforeend", img);
  }
  const buildIncompatibleBrowser = () => {
    document.getElementById("app")
      .insertAdjacentText("beforeend", "Este app só funciona em navegadores mobile.");
  }

  if(isMobile()) {
    buildShockingElement();
  } else {
    buildIncompatibleBrowser();
  }
};