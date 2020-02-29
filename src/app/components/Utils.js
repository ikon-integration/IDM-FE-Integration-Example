export default class Utils {}
//Data handling helpers
Utils.setNestedObject = function(obj, prop, value) {
  let reference = obj;
  const a = prop.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    let key = a[i];
    if (i + 1 != a.length) {
      //check if is not last object
      //safe check for sub.object
      if (reference[key] == null || reference[key] == undefined) {
        if (key == 0 || key == 1) reference = [];
        else reference = reference[key] = {};
      } else reference = reference[key];
    } else {
      reference[key] = value;
    }
  }
  return obj;
};
//propagate ref child to get referece
Utils.propagateRef = function(parent, props) {
  return {
    ref: _ref => Utils.setNestedObject(parent, props, _ref),
  };
};
