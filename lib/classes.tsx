// 使用高阶函数 拓展 prefix
function scopedClassMaker(prefix: string) {
  return function x(name?: string) {
    return [prefix, name].filter(Boolean).join("-");
  };
}

export { scopedClassMaker };
