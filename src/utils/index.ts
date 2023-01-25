export function debounce<T extends Function>(cb: T, wait = 20) {
  let h = 0;
  let callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}

/**
 * Function that checks for all decimal rules in a string
 * @param val String that needs to be stored & sent as a decimal
 * @returns undefined if rule is broken and the new value as the string if everything seems ok
 */
export function handleStringAsDecimal(val: string) {
  const newVal = val.replace(/[^0-9\.]+/, "");

  // dont let the user add the second decimal
  if (
    newVal.length > 1 && // if length is atleast 2
    [...newVal.slice(0, -1)].includes(".") && // if a decimal is already present
    newVal.charAt(newVal.length - 1) === "." // and new char is also a decimal
  )
    return undefined;

  return newVal;
}
