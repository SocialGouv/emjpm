// why not regex, because of http://en.wikipedia.org/wiki/International_email

export default function validateEmail(str) {
  var lastAtPos = str.lastIndexOf("@");
  var lastDotPos = str.lastIndexOf(".");
  return (
    lastAtPos < lastDotPos &&
    lastAtPos > 0 &&
    str.indexOf("@@") == -1 &&
    lastDotPos > 2 &&
    str.length - lastDotPos > 2
  );
}
