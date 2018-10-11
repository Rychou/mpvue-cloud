function f (func, obj) {
  return new Promise((resolve, reject) => {
    func({
      ...obj,
      success: resolve,
      fail: reject
    })
  })
}

var WX = {}

for (let key in wx) {
  WX[key] = obj => f(wx[key], obj)
}

export default WX
