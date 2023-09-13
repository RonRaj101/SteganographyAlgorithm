const canvasEncrypt = document.querySelector("#canvas-encrypt");
const targetInput = document.querySelector("#target");
const encryptionInput = document.querySelector("#encryption");
const saveButton = document.querySelector("#encrypt-btn");
let target;
let encryption;

const canvasDecrypt1 = document.querySelector("#canvas-decrypt1");
const canvasDecrypt2 = document.querySelector("#canvas-decrypt2");
const decryptImage = document.querySelector("#decrypt-image");
const decryptButton = document.querySelector("#decrypt");
let decryption;


//set canvas size for both encryption and decryption, must be same size
let canvasWidth = 300;
let canvasHeight = 300;

  //input images (mask and target) for encryption
  targetInput.onchange = (e) => {
    const img = new SimpleImage(targetInput);
    img.setSize(canvasWidth, canvasHeight);
    target = img;
  };
  
  encryptionInput.onchange = (e) => {
    const img = new SimpleImage(encryptionInput);
    img.setSize(canvasWidth, canvasHeight);
    encryption = img;
  };

  //input image for decryption
  decryptImage.onchange = (e) => {
    const img = new SimpleImage(decryptImage);
    img.setSize(canvasWidth, canvasHeight);
    decryption = img;
  };
  
  decryptButton.onclick = decrypt;
  saveButton.onclick = save;
  
  function getValue(x) {
    return x - (x % 16);
  }

  function save() {
    const img = new SimpleImage(canvasWidth, canvasHeight);

    for (let i = 0; i < canvasWidth; i++) {
      for (let j = 0; j < canvasHeight; j++) {
        const targetPixel = target.getPixel(i, j);
        const encryptionPixel = encryption.getPixel(i, j);

        const pixel = img.getPixel(i, j);
        pixel.setRed(
          getValue(targetPixel.getRed()) / 16 + getValue(encryptionPixel.getRed())
        );
        pixel.setGreen(
          getValue(targetPixel.getGreen()) / 16 +
            getValue(encryptionPixel.getGreen())
        );
        pixel.setBlue(
          getValue(targetPixel.getBlue()) / 16 +
            getValue(encryptionPixel.getBlue())
        );
      }
    }
    img.drawTo(canvasEncrypt);
  }
  

  function decrypt(){

    const img1 = new SimpleImage(canvasWidth, canvasHeight);
    const img2 = new SimpleImage(canvasWidth, canvasHeight);

    for (let i = 0; i < canvasWidth; i++) {
        for (let j = 0; j < canvasHeight; j++) {
            const pixel = decryption.getPixel(i, j);
            const pixel1 = img1.getPixel(i, j);
            const pixel2 = img2.getPixel(i, j);

            pixel1.setRed((pixel.getRed() % 16)  * 16);
            pixel1.setGreen((pixel.getGreen() % 16) * 16);
            pixel1.setBlue((pixel.getBlue() % 16) * 16);

            pixel2.setRed((Math.floor(pixel.getRed() / 16)) * 16);
            pixel2.setGreen((Math.floor(pixel.getGreen() / 16)) * 16);
            pixel2.setBlue((Math.floor(pixel.getBlue() / 16)) * 16);
        } 
    }
    img1.drawTo(canvasDecrypt1);
    img2.drawTo(canvasDecrypt2);
  }