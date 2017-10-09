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
  const { stats } = store.getState()
  const groupInStats = stats.groups.find(item => item.id === groupId)
  const dictionaryGroups = store.getState().dictionary.groups || []
  const dictionaryGroup = dictionaryGroups.find(item => item.id === groupId)
  const wordsCount = groupInStats.words.length

  if (groupInStats) {
    store.dispatch(updateGroupStats(dictionaryGroup))
  }
  else {
    store.dispatch(createGroupStats(dictionaryGroup))
  }

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
