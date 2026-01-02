export const convertToHex = (color: string): string => {
  if (color.startsWith("#")) {
    if (color.length === 4) {
      return (
        "#" +
        color[1] +
        color[1] +
        color[2] +
        color[2] +
        color[3] +
        color[3]
      ).toUpperCase();
    }
    return color.toUpperCase();
  }

  const temp = document.createElement("div");
  temp.style.color = color;
  document.body.appendChild(temp);

  const computedColor = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);

  const match = computedColor.match(/(\d+)/g);

  if (!match || match.length < 3) {
    return color;
  }

  const r = parseInt(match[0], 10);
  const g = parseInt(match[1], 10);
  const b = parseInt(match[2], 10);

  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

export const areColorsEqual = (
  color1: string | null,
  color2: string
): boolean => {
  if (!color1) return false;

  try {
    const hex1 = convertToHex(color1);
    const hex2 = convertToHex(color2);
    return hex1 === hex2;
  } catch (error) {
    return color1 === color2;
  }
};
