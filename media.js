const videoElement = document.getElementById('input_video');
    const canvasElement = document.getElementById('output_canvas');
    const canvasCtx = canvasElement.getContext('2d');
  
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });
  
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    });
  
    let lastScrollY = null;
    let lastZoomDist = null;
    let zoomScale = 1;
  
    hands.onResults((results) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  
      const handsLandmarks = results.multiHandLandmarks;
      const handedness = results.multiHandedness;
  
      if (handsLandmarks && handedness) {
        for (let i = 0; i < handsLandmarks.length; i++) {
          const landmarks = handsLandmarks[i];
          const handLabel = handedness[i].label; // "Left" ou "Right"
  
          const polegar = landmarks[4];
          const indicador = landmarks[8];
          const centro = landmarks[9];
  
          const dx = polegar.x - indicador.x;
          const dy = polegar.y - indicador.y;
          const distancia = Math.sqrt(dx * dx + dy * dy);
  
          // Desenhar pontos no canvas
          [polegar, indicador].forEach((ponto) => {
            canvasCtx.beginPath();
            canvasCtx.arc(ponto.x * canvasElement.width, ponto.y * canvasElement.height, 5, 0, 2 * Math.PI);
            canvasCtx.fillStyle = handLabel === "Right" ? "blue" : "red";
            canvasCtx.fill();
          });
  
          // INVERTE os controles por causa da imagem espelhada
          if (handLabel === "Left") {
            // Scroll com a mão visualmente esquerda (handLabel = Left)
            if (distancia < 0.05) {
              const y = centro.y * canvasElement.height;
              if (lastScrollY !== null) {
                const deltaY = y - lastScrollY;
                window.scrollBy(0, deltaY * 9); // sensibilidade de scroll
              }
              lastScrollY = y;
            } else {
              lastScrollY = null;
            }
          }
  
          if (handLabel === "Right") {
            // Zoom com a mão visualmente direita (handLabel = Right)
            if (lastZoomDist !== null) {
              const delta = distancia - lastZoomDist;
              zoomScale += delta * 1.5; // sensibilidade reduzida
              zoomScale = Math.max(0.5, Math.min(zoomScale, 3));
              document.body.style.transform = `scale(${zoomScale})`;
              document.body.style.transformOrigin = "center center";
            }
            lastZoomDist = distancia;
          }
        }
      } else {
        lastScrollY = null;
        lastZoomDist = null;
      }
  
      canvasCtx.restore();
    });
  
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 320,
      height: 240
    });
  
    camera.start();