export const reverse = function() {
  const p = document.querySelector("p");
  p.textContent = p
    .split("")
    .reverse()
    .join("");
};

export const pColor = function pColor() {
  document.querySelector("p").style.color = "red";
};
