export function generateSerialNumber(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let serialNumber = '';
  
    for (let i = 0; i < length; i++) {
      const randomIdx = Math.floor(Math.random() * characters.length);
      serialNumber += characters.charAt(randomIdx);
    }
  
    return serialNumber;
}
  
