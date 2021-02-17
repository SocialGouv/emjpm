export default function goBackAndRefresh() {
  window.history.go(-1);
  setTimeout(() => {
    location.reload();
  }, 0);
}
