export const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let hue = 0;
  let sat = 0;
  let lum = 0;

  if (delta == 0) {
    hue = 0;
  } else if (cmax == r) {
    hue = ((g - b) / delta) % 6;
  } else if (cmax == g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }

  hue = Math.round(hue * 60);
  if (hue < 0) hue += 360;

  lum = (cmax + cmin) / 2;

  sat = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lum - 1));

  sat = +(sat * 100).toFixed(1);
  lum = +(lum * 100).toFixed(1);

  return { string: `hsl(${hue}, ${sat}%, ${lum}%)`, hue: hue, sat: sat, lum: lum };
};

export const adjustHSL = (hue, targetSat = 50, targetLum = 50) => {
  return `hsl(${hue}, ${targetSat}%, ${targetLum}%)`;
};
