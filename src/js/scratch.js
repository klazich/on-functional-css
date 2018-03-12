import {
  flow,
  flowRight
} from 'lodash/fp';

const fnHideElem = elem => {
  hideElement(elem)
  return elem
}

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const curry = fn => (...args) => fn.bind(null, ...args);
const map = curry((fn, arr) => arr.map(fn));
