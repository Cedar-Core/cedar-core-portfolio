export function smoothScrollTo(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

export function getScrollOffset(headerHeight: number = 64): number {
  return headerHeight;
}

