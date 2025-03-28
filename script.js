

AOS.init(
  {
      duration: 1200,
  }
);

document.querySelectorAll(".video").forEach(video => {
  video.addEventListener("mouseover", () => {
      video.controls = false;
  });

  video.addEventListener("touchstart", () => {
      video.controls = false;
  });
});
