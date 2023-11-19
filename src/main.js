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
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }
      navigator.vibrate(1000);
    }

    return img;
  }

  const setFogFadeout = () => {
    document
      .getElementById("fog")
      .addEventListener("click", ({ target }) => {
        target.classList.add("hidden");
      });
  }

  const buildShockingElement = () => {
    document
      .getElementById("app")
      .insertAdjacentElement("beforeend", buildGrapeImage());
    setFogFadeout();
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