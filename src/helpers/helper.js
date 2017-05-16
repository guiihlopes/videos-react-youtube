export function returnViewCount(number) {
  let extensions = ['','k','m','b'];
  let qtdCasas = Math.floor(number.toString().length / 3.5);
  let division = Math.pow(1000,qtdCasas);
  let ext = extensions[qtdCasas];
  return Math.floor( number / division ) + ext;
}
