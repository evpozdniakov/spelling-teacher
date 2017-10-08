export function handleEditGroup(store, next, action) {
  const { data } = action
  const { groups } = store.getState().dictionary
  const group = groups.find(item => item.id === data.id)
  const { title, words } = group

  next({
    ...action,
    data: {
      ...data,
      title,
      words,
    },
  })
}

export function handleSaveGroup(store, next, action) {
  const { groupId } = store.getState().internal
  const { data } = action

  next({
    ...action,
    data: {
      ...data,
      id: groupId || null,
    }
  })
}
