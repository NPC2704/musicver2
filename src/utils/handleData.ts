const handleData = {
  shuffle: function (array: any[]) {
    if (typeof array != "object") return array
    const array_ = [...array]
    let currentIndex = array_.length,
      randomIndex
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array_[currentIndex], array_[randomIndex]] = [
        array_[randomIndex],
        array_[currentIndex],
      ]
    }

    return array_
  },
  chunkArray: function (myArray: any[], chunk_size: number) {
    var index = 0
    var arrayLength = myArray.length
    var tempArray = []

    for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index + chunk_size)
      // Do something if you want with the group
      tempArray.push(myChunk)
    }

    return tempArray
  },
  stringLimit: function (string: string, limit: number) {
    if (string?.length <= limit) return string
    return string?.slice(0, limit) + "..."
  },
}

export default handleData
