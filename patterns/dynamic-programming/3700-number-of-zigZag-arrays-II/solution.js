/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function (n, l, r) {
  const MOD = 1000000007n;
  const m = r - l + 1;

  if (n === 1) return m % Number(MOD);

  const size = 2 * m;

  const matMul = (A, B) => {
    const C = Array.from({ length: size }, () => Array(size).fill(0n));

    for (let i = 0; i < size; i++) {
      for (let k = 0; k < size; k++) {
        if (A[i][k] === 0n) continue;

        for (let j = 0; j < size; j++) {
          if (B[k][j] === 0n) continue;

          C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
        }
      }
    }

    return C;
  };

  const matPow = (M, exp) => {
    let R = Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => (i === j ? 1n : 0n)),
    );

    while (exp > 0) {
      if (exp & 1) R = matMul(R, M);
      M = matMul(M, M);
      exp >>= 1;
    }

    return R;
  };

  const matVec = (M, V) => {
    const res = Array(size).fill(0n);

    for (let i = 0; i < size; i++) {
      let sum = 0n;

      for (let j = 0; j < size; j++) {
        if (M[i][j] === 0n) continue;

        sum = (sum + M[i][j] * V[j]) % MOD;
      }

      res[i] = sum;
    }

    return res;
  };

  const base = Array(size).fill(0n);

  for (let x = 0; x < m; x++) {
    base[x] = BigInt(x);
    base[m + x] = BigInt(m - 1 - x);
  }

  if (n === 2) {
    let ans = 0n;
    for (const v of base) {
      ans = (ans + v) % MOD;
    }
    return Number(ans);
  }

  const T = Array.from({ length: size }, () => Array(size).fill(0n));

  for (let x = 0; x < m; x++) {
    for (let y = 0; y < x; y++) {
      T[x][m + y] = 1n;
    }

    for (let y = x + 1; y < m; y++) {
      T[m + x][y] = 1n;
    }
  }

  const P = matPow(T, n - 2);
  const finalState = matVec(P, base);

  let ans = 0n;

  for (const v of finalState) {
    ans = (ans + v) % MOD;
  }

  return Number(ans);
};
