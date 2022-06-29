if (navigator.share) {
  let url = document.location.href;
  const canonicalElement = document.querySelector("link[rel=canonical]");
  if (canonicalElement !== null) {
    url = canonicalElement.href;
  }

  navigator
    .share({
      title: "Tarn",
      text: "Tarn",
      url,
    })
    .then(() => console.log("Successful share"))
    .catch((error) => console.log("Error sharing", error));
}

if (navigator.canShare && navigator.canShare({ files: filesArray })) {
  navigator
    .share({
      files: filesArray,
      title: "Srk Team Pictures",
      text: "Photos from Feb 28 to September 19.",
    })
    .then(() => console.log("Share was successful."))
    .catch((error) => console.log("Sharing failed", error));
} else {
  console.log(`Your system doesn't support sharing files.`);
}
