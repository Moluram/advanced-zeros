module.exports = function getZerosCount(number, base) {
    return getPrimes(base)
        .filter(prime => base >= prime && base % prime === 0)
        .map(prime => divideBase(prime, base))
        .map(value => countOccurrences(value, number))
        .reduce((previousValue, currentValue) => previousValue > currentValue ?
                currentValue : previousValue, Number.MAX_SAFE_INTEGER);

};

function countOccurrences(value, number) {
    let del = value.base;
    let count = 0;
    let division = 2 * value.base;

    while (division >= value.base) {
        division = Math.floor(number / del);
        del *= value.base;
        count += division
    }

    return Math.trunc(count / value.count)
}

function divideBase(prime, base) {
    let counter = 0;
    while (base >= prime && base % prime === 0) {
        base /= prime;
        counter++;
    }
    return {base: prime, count: counter};
}

function getPrimes(base) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= base; ++i) {
        if (!sieve[i]) {
            primes.push(i);
            for (j = i << 1; j <= base; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}