const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};


const encode = async data => {
  const bufferlike = await JSON.stringify(data, getCircularReplacer());
  const buf = Buffer.from(bufferlike);
  const base64 = buf.toString('base64');
  return base64;
};

module.exports.encode = encode;