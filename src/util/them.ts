interface keys {
  [key: string]: string
}
const defaults: keys = {
  //除却个人中心外使用的颜色
  warm: `${220},${106},${18}`,
  success: `${126},${191},${80}`,
  primay: `${107},${158},${238}`,
  //这两个是渐变色
  changeGreen: `${71},${233},${75}`,
  changeYellow: `${250},${199},${62}`,
  //这些是字体和按钮的颜色
  green: `${25},${183},${29}`, //图标and文字绿色
  yellow: `${250},${172},${62}`, //图标and文字黄色以及标签
  blue: `${64},${158},${255}`, //查询的蓝色、
  //删除按钮的红色
  important: `${245},${122},${121}`,
  //基本只用一次的紫色
  purple: `${188},${87},${252}`
}
for (let key in defaults) {
  document
    .getElementsByTagName('body')[0]
    .style.setProperty(`--${key}`, defaults[key])
}

export default defaults
