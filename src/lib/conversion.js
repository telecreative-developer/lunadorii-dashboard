export const convertToIDR = number => {
  let idr = ""
  let numberRev = number
    .toString()
    .split("")
    .reverse()
    .join("")
  for (let i = 0; i < numberRev.length; i++)
    if (i % 3 === 0) idr += numberRev.substr(i, 3) + "."
  return (
    "Rp. " +
    idr
      .split("", idr.length - 1)
      .reverse()
      .join("")
  )
}
