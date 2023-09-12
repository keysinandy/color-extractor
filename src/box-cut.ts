import { Color } from './types';
const MAX_NUM = 8;
/**
 * 颜色盒子类
 *
 * @param {Array} colorRange    [[rMin, rMax],[gMin, gMax], [bMin, bMax]] 颜色范围
 * @param {any} total   像素总数, imageData / 4
 * @param {any} data    像素数据集合
 */
type ColorRange = [[number, number], [number, number], [number, number]];
type ColorItem = {
  color: number;
  count: number;
};

class ColorBox {
  colorRange: ColorRange;
  total: number;
  data: Color[];
  volume: number;
  rank: number;
  constructor(colorRange: ColorRange, data: Color[]) {
    this.colorRange = colorRange;
    this.data = data;
    this.total = data.length;
    this.volume =
      (colorRange[0][1] - colorRange[0][0]) *
      (colorRange[1][1] - colorRange[1][0]) *
      (colorRange[2][1] - colorRange[2][0]);

    this.rank = this.total * this.volume;
  }
  getColor() {
    const data = this.data;
    const total = this.total;
    let redCount = 0,
      greenCount = 0,
      blueCount = 0;
    for (const [red, green, blue] of data) {
      redCount += red;
      greenCount += green;
      blueCount += blue;
    }
    return [~~(redCount / total), ~~(greenCount / total), ~~(blueCount / total)];
  }
}
// 获取切割边
function getCutSide(colorRange: ColorRange) {
  // r:0,g:1,b:2
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(colorRange[i][1] - colorRange[i][0]);
  }
  return arr.indexOf(Math.max(arr[0], arr[1], arr[2]));
}
// 切割颜色范围
function cutRange(colorRange: ColorRange, colorSide: number, cutValue: number): any[] {
  const arr1: any[] = [];
  const arr2: any[] = [];
  colorRange.forEach(function (item) {
    arr1.push(item.slice());
    arr2.push(item.slice());
  });
  arr1[colorSide][1] = cutValue;
  arr2[colorSide][0] = cutValue;
  return [arr1, arr2];
}
// 找到出现次数为中位数的颜色
function getMedianColor(colorCountMap: Record<string, number>) {
  const arr: ColorItem[] = [];
  for (const key in colorCountMap) {
    arr.push({
      color: parseInt(key),
      count: colorCountMap[key],
    });
  }
  const sortArr = __quickSort(arr);
  let medianCount = 0;
  const medianIndex = Math.floor(sortArr.length / 2);
  for (let i = 0; i <= medianIndex; i++) {
    medianCount += sortArr[i].count;
  }
  return {
    color: ~~sortArr[medianIndex].color,
    count: medianCount,
  };

  function __quickSort(arr: ColorItem[]): ColorItem[] {
    if (arr.length <= 1) {
      return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2),
      pivot = arr.splice(pivotIndex, 1)[0];
    const left = [],
      right = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].count <= pivot.count) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return __quickSort(left).concat([pivot], __quickSort(right));
  }
}
// 切割颜色盒子
function cutBox(colorBox: ColorBox) {
  const colorRange = colorBox.colorRange,
    cutSide = getCutSide(colorRange),
    colorCountMap: Record<number, number> = {},
    total = colorBox.total,
    data = colorBox.data;
  // 统计出各个值的数量
  for (let i = 0; i < total; i++) {
    const color = data[i][cutSide];
    if (colorCountMap[color]) {
      colorCountMap[color] += 1;
    } else {
      colorCountMap[color] = 1;
    }
  }
  const medianColor = getMedianColor(colorCountMap);
  const cutValue = medianColor.color;
  const cutCount = medianColor.count;
  const newRange = cutRange(colorRange, cutSide, cutValue);
  const box1 = new ColorBox(newRange[0], data.slice(0, cutCount)),
    box2 = new ColorBox(newRange[1], data.slice(cutCount));
  return [box1, box2];
}
// 队列切割
function queueCut(queue: ColorBox[], num: number) {
  while (queue.length < num) {
    queue.sort(function (a, b) {
      return a.rank - b.rank;
    });
    const colorBox = queue.pop()!;
    const [prevBox, nextBox] = cutBox(colorBox);
    queue = queue.concat(prevBox);
    if (nextBox.total === 0) {
      break;
    } else {
      queue = queue.concat(nextBox);
    }
  }
  return queue.slice(0, num);
}
export function themeColor(imageData: Color[]) {
  let rMin = 255,
    rMax = 0,
    gMin = 255,
    gMax = 0,
    bMin = 255,
    bMax = 0;
  for (const [red, green, blue] of imageData) {
    if (red < rMin) {
      rMin = red;
    }
    if (red > rMax) {
      rMax = red;
    }
    if (green < gMin) {
      gMin = green;
    }
    if (green > gMax) {
      gMax = green;
    }
    if (blue < bMin) {
      bMin = blue;
    }
    if (blue > bMax) {
      bMax = blue;
    }
  }
  const colorRange: ColorRange = [
    [rMin, rMax],
    [gMin, gMax],
    [bMin, bMax],
  ];
  const colorBox = new ColorBox(colorRange, imageData);
  const colorBoxArr = queueCut([colorBox], MAX_NUM);
  const colorArr = [];
  for (let j = 0; j < colorBoxArr.length; j++) {
    colorBoxArr[j].total && colorArr.push(colorBoxArr[j].getColor());
  }
  return colorArr as Color[];
}
