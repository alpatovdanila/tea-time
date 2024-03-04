let wakeLock = null;



const getWakeLock = async () => {
  wakeLock = await navigator.wakeLock.request("screen")
}

getWakeLock();


document.addEventListener("visibilitychange", async () => {
  if (wakeLock !== null && document.visibilityState === "visible") {
    getWakeLock()
  }
});
