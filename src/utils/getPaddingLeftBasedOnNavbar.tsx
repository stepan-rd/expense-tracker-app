export function getPaddingLeftBasedOnNavbar(
  isNavbarVisible: boolean,
) {
  if (isNavbarVisible && window.innerWidth > 850) {
    return "250px";
  }
  
  return "40px";
}
