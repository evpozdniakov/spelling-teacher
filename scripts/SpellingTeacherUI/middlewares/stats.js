import { createGroupStats, updateGroupStats } from '../actions/stats'

export function handleStartTraining(store, next, action) {
  const { groupId } = action.data
  const { stats } = store.getState()
  const groupInStats = stats.groups.find(item => item.id === groupId)
  const dictionaryGroups = store.getState().dictionary.groups || []
  const dictionaryGroup = dictionaryGroups.find(item => item.id === groupId)

  if (groupInStats) {
    store.dispatch(updateGroupStats(dictionaryGroup))
  }
  else {
    store.dispatch(createGroupStats(dictionaryGroup))
  }

  next(action)
}
