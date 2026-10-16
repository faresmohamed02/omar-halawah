(function () {
  var scene = document.getElementById("scene");
  var flip = document.getElementById("flip");
  if (!scene || !flip) return;

  function setFlipped(flipped) {
    scene.classList.toggle("is-flipped", flipped);
    flip.setAttribute("aria-pressed", String(flipped));
    flip.textContent = flipped ? flip.dataset.back : flip.dataset.flip;
  }

  flip.addEventListener("click", function () {
    setFlipped(!scene.classList.contains("is-flipped"));
  });

  scene.addEventListener("click", function (event) {
    if (event.target.closest("a, button")) return;
    setFlipped(!scene.classList.contains("is-flipped"));
  });

  var copyBtn = document.getElementById("copy-phone");
  if (copyBtn) {
    copyBtn.addEventListener("click", async function () {
      var original = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText("+97455655338");
        copyBtn.textContent = copyBtn.dataset.done || original;
        setTimeout(function () {
          copyBtn.textContent = original;
        }, 1800);
      } catch (error) {
        copyBtn.textContent = "+97455655338";
      }
    });
  }

  var shareBtn = document.getElementById("share");
  if (shareBtn) {
    shareBtn.addEventListener("click", async function () {
      var payload = {
        title: document.title,
        text: shareBtn.dataset.text || document.title,
        url: location.href
      };
      var original = shareBtn.textContent;
      try {
        if (navigator.share) {
          await navigator.share(payload);
          return;
        }
        await navigator.clipboard.writeText(location.href);
        shareBtn.textContent = shareBtn.dataset.done || original;
        setTimeout(function () {
          shareBtn.textContent = original;
        }, 1800);
      } catch (error) {
        shareBtn.textContent = original;
      }
    });
  }

  var printBtn = document.getElementById("print");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }
})();
