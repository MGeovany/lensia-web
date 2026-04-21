function hashToHue(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h % 360;
}

export function photoGradient(id: string) {
  const hue = hashToHue(id);
  const a = `hsl(${hue} 70% 55%)`;
  const b = `hsl(${(hue + 28) % 360} 70% 45%)`;
  return `linear-gradient(135deg, ${a}, ${b})`;
}
