import uva from './uva.png';
import aiai from './aiai.mp3';
import './main.scss';

window.onload = () => {
  const isMobile = () => {
    const mobileUAs = ["android", "ios"];
    const currentUserAgent = navigator.userAgent.toLowerCase();
    return new RegExp(mobileUAs.join("|")).test(currentUserAgent)
  }

  const buildGrapeImage = () => {
    const img = new Image();
    const sound = new Audio(aiai);

    img.src = uva;
    img.alt = 'Aqui do lado, Pederneiras';
    img.ontouchstart = (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      sound.play();
      navigator.vibrate(1000);
    }
    img.ontouchend = (ev) => {
      navigator.vibrate(0);
    }
    img.ontouchcancel = (ev) => {
      navigator.vibrate(0);
    }

    return img;
  }

  const buildShockingElement = () => {
    document
      .getElementById("app")
      .insertAdjacentElement("beforeend", buildGrapeImage());
  }

  const buildIncompatibleBrowser = () => {
    document
      .getElementById("app")
      .insertAdjacentText("beforeend", "Este app só funciona em navegadores mobile.");
  }

  isMobile()
    ? buildShockingElement()
    : buildIncompatibleBrowser();
};