

module.exports = function parse(stdout) {
  stdout = stdout || '';
  const lines = stdout.split('\n');
  if (lines.length > 0) lines.shift();
  if (lines.length === 0) return [];

  return lines.map(line => {
    const columns = line.split(' ').reduce(function(arr, cur, index) {
      if (!cur || cur.length === 0) return arr;
      arr.push(cur);
      return arr;
    }, []);
    if (columns.length < 7) return null;

    return {
      id: columns[0],
      image: columns[1]
    };
  }).filter(line => {
    if (line) return true;
    else return false;
  });
}
