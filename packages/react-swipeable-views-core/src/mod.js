/* eslint-disable flowtype/require-valid-file-annotation */

function mod(n, m) {
  const q = n % m;
  return q < 0 ? (q + m) : q;
}

export default mod;
