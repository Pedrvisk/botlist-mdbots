function calculatePopupPosition(width: number, height: number) {
  const dualScreenLeft = window.screenLeft || window.screenX;
  const dualScreenTop = window.screenTop || window.screenY;
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const systemZoom = screenWidth / window.screen.width;
  const left = (screenWidth - width) / 2 / systemZoom + dualScreenLeft;
  const top = (screenHeight - height) / 2 / systemZoom + dualScreenTop;
  return { left, top };
}

function openPopupWindow(
  url: string,
  title: string,
  width: number,
  height: number
): Promise<boolean> {
  const { left, top } = calculatePopupPosition(width, height);
  const newWindow = window.open(
    url,
    title,
    `width=${width},height=${height},top=${top},left=${left}`
  );
  if (!newWindow) return Promise.resolve(false);
  newWindow.location.href = url;
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(interval);
        resolve(true);
      }
    }, 500);
  });
}

function PopupWindow(url: string, title: string, width = 500, height = 550): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  return openPopupWindow(url, title, width, height);
}

export { PopupWindow };
