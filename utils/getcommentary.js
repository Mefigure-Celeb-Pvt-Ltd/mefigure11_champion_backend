module.exports.getcommentary = function (old, current) {
  if (old) {
    console.log(old, current, 'old');
    let l = current.length;
    let lastball = current[l - 1];
    let d = old.length;
    let oldlastball = old[d - 1];
    if (oldlastball?.ballNbr) {
      let u = current.filter((c) => c.ballNbr > oldlastball?.ballNbr);
      let x = old.filter((o) => o.ballNbr < lastball?.ballNbr);
      x.push(...u);
      return x;
    } else {
      return current;
    }
  }
  else {
    current;
  }
};
