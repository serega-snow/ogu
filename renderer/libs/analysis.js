module.exports = class CorrelationAnalysis {
  constructor() {
  }

  /*
   * Get сorrelation coefficients
   *
   * @param {array} args The any number of arrays.
   * @return {array} Coefficients.
   */
  сorrelationСoefficient(...args) {
    const n = args.length;
    const matrix = this.covarianceMatrix(...args);
    const coefficients = [];

    for (let k = 0; k < n; ++k) {
      const v = Math.sqrt(matrix[k][k]) / this.arithmeticMean(args[k]) * 100;
      coefficients.push(v);
    }

    return coefficients;
  }
  
  /*
   * Get element of covariance matrix
   */
  cov(a, b) {
    const meanA = this.arithmeticMean(a);
    const meanB = this.arithmeticMean(b);
    const n = a.length;
    let sum = 0;

    for (let k = 0; k < n; ++k) {
      sum += (a[k] - meanA) * (b[k] - meanB) / n;
    }

    return sum;
  }

  /*
   * Get covariance matrix
   */
  covarianceMatrix(...args) {
    const n = args.length;
    const rows = [];
    
    for (let j = 0; j < n; ++j) {
      const columns = [];

      for (let k = 0; k < n; ++k) {
        columns.push(this.cov(args[j], args[k]));
      }

      rows.push(columns);
    }
    
    return rows;
  }

  /*
   * Get arithmetic mean
   */
  arithmeticMean(a) {
    return a.reduce((accum, value) => accum + value, 0) / a.length;
  }
};