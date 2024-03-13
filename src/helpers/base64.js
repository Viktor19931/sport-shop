const decodeChar = (c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;

export const b64DecodeUnicode = (str) =>
  decodeURIComponent(atob(str).split('').map(decodeChar).join(''));

const encodeChar = (_, p1) => String.fromCharCode(+`0x${p1}`);

export const b64EncodeUnicode = (str) =>
  btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, encodeChar));

export const base64ToArrayBuffer = (base64) => {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return new Uint8Array(bytes.buffer);
};
