/**
 * Created by liekkas on 2017/3/17.
 */
import request from '../utils/request'

export function fetch (api) {
  return request(api)
}

export function create ({api, values}) {
  return request(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(values)
  })
}

export function remove ({api, id}) {
  return request(`${api}/${id}`, {
    method: 'DELETE'
  })
}

export function update ({api, id, values}) {
  return request(`${api}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(values)
  })
}
