export function isPWAInstalled(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS
    (window.navigator as any).standalone === true
  );
}

export function isIOS(): boolean {
  return (
    /iphone|ipad|ipod/i.test(window.navigator.userAgent) &&
    !(window.navigator as any).standalone
  );
}
