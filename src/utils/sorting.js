const generateSortFct = (fieldName, ascending = true, isDate = false) => {
  return (a, b) => {
    let aValue = a[fieldName]
    let bValue = b[fieldName]

    if (isDate) {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (aValue < bValue) return ascending ? -1 : 1
    if (aValue > bValue) return ascending ? 1 : -1
    return 0
  }
}

const sortFunctions = {
  "firstname": {
    asc: alphaAscSorting()
  }
}
