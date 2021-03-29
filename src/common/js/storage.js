import storage from 'good-storage'

const SELLER_KEY = '__seller__'

// 将数据保存到localStorage
export function saveToLocal(id, key, val) {
  const seller = storage.get(SELLER_KEY, {})
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(SELLER_KEY, seller)
}

// 从localStorage读取缓存数据
export function loadFromLocal(id, key, def) {
  const seller = storage.get(SELLER_KEY, {})
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}
