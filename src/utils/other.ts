/*
 * Reshaping array of generic typed object into matrix
 * with @cols columns.
 */
export const arr_reshape = (
  arr: readonly any[],
  cols: number
): Array<any[]> => {
  let arr_copy = [...arr];
  let res_arr = [];
  let col_arr = [];
  let curr_len = 0;

  while (arr_copy.length) {
    if (curr_len < cols) {
      col_arr.push(arr_copy.shift());
      curr_len++;
    } else {
      res_arr.push(col_arr);
      curr_len = 0;
      col_arr = [];
    }
  }
  if (col_arr.length) {
    res_arr.push(col_arr);
  }

  return res_arr;
};

console.log("djnkjdsa");
