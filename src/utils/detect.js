// export const isClient = typeof window !== 'undefined';

// export const getBreakpoint = () => {
//   if (!isClient) return {};

//   const tablet = 768;
//   const desktop = 1024;

//   return {
//     mobile: window.innerWidth < tablet,
//     tablet: window.innerWidth >= tablet && window.innerWidth < desktop,
//     desktop: window.innerWidth >= desktop,
//   };
// };

// export const getDominantColor = (img) => {
//   const quantize = require('quantize');
//   const { RGBToHSL } = require('./colors');
//   if (!isClient) return;
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext && canvas.getContext('2d');
//   context.drawImage(img, 0, 0);
//   const height = img.naturalHeight || canvas.height || img.height;
//   const width = img.naturalWidth || canvas.width || img.height;
//   let data = context.getImageData(0, 0, width, height).data;
//   let rgb = { r: 0, g: 0, b: 0, hue: 0 };
//   let count = 0;
//   const pixelOffset = 1000;
//   let i;
//   for (i = 0; i < data.length; i += pixelOffset * 4) {
//     const hsl = RGBToHSL(data[i], data[i + 1], data[i + 2]);
//     // console.log(hsl.hue);
//     if (hsl.sat >= 12.5 && hsl.sat <= 85 && hsl.lum >= 25 && hsl.lum <= 85) {
//       count++;
//       rgb.hue += hsl.hue;
//       rgb.r += data[i];
//       rgb.g += data[i + 1];
//       rgb.b += data[i + 2];
//     }
//   }
//   console.log(rgb.hue / count);
//   rgb.r = Math.floor(rgb.r / count);
//   rgb.g = Math.floor(rgb.g / count);
//   rgb.b = Math.floor(rgb.b / count);
//   console.log(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
//   console.log(RGBToHSL(rgb.r, rgb.g, rgb.b));
//   return {
//     string: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
//     r: rgb.r,
//     g: rgb.g,
//     b: rgb.b,
//     hue: Math.floor(rgb.hue / count),
//   };
// };

export const isClient = typeof window !== 'undefined';

export const getBreakpoint = () => {
  if (!isClient) return {};

  const tablet = 768;
  const desktop = 1024;

  return {
    mobile: window.innerWidth < tablet,
    tablet: window.innerWidth >= tablet && window.innerWidth < desktop,
    desktop: window.innerWidth >= desktop,
  };
};

export const getDominantColor = (img) => {
  const quantize = require('quantize');
  const { RGBToHSL, adjustHSL } = require('./colors');
  if (isClient && img) {
    const imgSize = {
      height: img.naturalHeight || canvas.height || img.height,
      width: img.naturalWidth || canvas.width || img.height,
    };

    // Create && Configure Canvas Element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    context.drawImage(img, 0, 0, imgSize.width, imgSize.height);
    let data = context.getImageData(0, 0, imgSize.width, imgSize.height).data;
    const pixelCount = imgSize.width * imgSize.height;

    // Create array of non-white/black and non-translucent pixels
    let rgb = { r: 0, g: 0, b: 0 };
    let count = 0;
    const allPixels = [];
    for (let i = 0; i < pixelCount; i = i + 5) {
      let offset = i * 4;
      let r = data[offset + 0];
      let g = data[offset + 1];
      let b = data[offset + 2];
      let a = data[offset + 3];
      const hsl = RGBToHSL(r, g, b);
      if (a && a >= 125) {
        if (!(r > 240 && g > 240 && b > 240)) {
          count++;
          allPixels.push([r, g, b, a]);
        }
      }
    }

    // Generate cluster of pixels
    const cMap = quantize(allPixels, 64);
    const palette = cMap ? cMap.palette() : null;
    const hsl = RGBToHSL(palette[0][0], palette[0][1], palette[0][2]);
    return {
      string: `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`,
      palette: palette[1],
    };
  }

  return null;
};
