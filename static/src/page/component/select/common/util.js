import _ from 'lodash';

function getTextWidth(text, fontSize = 12) {
  let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  context.font = `normal ${fontSize}px sans-serif`;
  let metrics = context.measureText(text);
  return Math.ceil(metrics.width)
}

export function getMaxItemWidth(options = []) {
  if (_.isEmpty(options)) return 132
  const text = _.chain(options)
    .map((item) => [item.name.length, item.name])
    .maxBy(item => item[0])
    .value()[1]
  return Math.min(200, getTextWidth(text) + 80)
}


