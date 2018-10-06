import _ from 'underscore';

export function _pipe(...funcs) {
  const reversed = funcs.slice().reverse();
  return _.compose(...reversed);
}

export function _go(arg, ...funcs) {
  return _pipe(...funcs)(arg);
}

export function _firstToArray(list, num) {
  const firstN = _.isNumber(num) ? num : 1;
  return _go(
    list,
    _.partial(_.first, _, firstN),
    result => (_.isArray(result) ? result : [result]),
  );
}
