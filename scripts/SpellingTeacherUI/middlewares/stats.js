import {
  createGroupStats,
  updateGroupStats,
} from '../actions/stats'

import {
  pickRandomWord,
  sayTestWord,
} from '../actions/training'

export function handleStartTraining(store, next, action) {
  const { groupId } = action.data
  const groupInStats = findGroupInStatsById(store, groupId)
  const dictionaryGroups = store.getState().dictionary.groups || []
  const dictionaryGroup = dictionaryGroups.find(item => item.id === groupId)

  if (groupInStats) {
    store.dispatch(updateGroupStats(dictionaryGroup))
  }
  else {
    store.dispatch(createGroupStats(dictionaryGroup))
  }

  const { words } = findGroupInStatsById(store, groupId)
  const wordsCount = words.length

  next({
    ...action,
    data: {
      ...action.data,
      wordsCount,
    }
  })
  store.dispatch(pickRandomWord())

  store.dispatch(sayTestWord())
}

function findGroupInStatsById(store, id) {
  return store.getState().stats.groups.find(item => item.id === id)
}
