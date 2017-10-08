export function handleEditGroup(store, next, action) {
  const { data } = action
  const { id } = data

  if (!id) {
    next({
      ...action,
      data: {
        ...data,
        title: '',
        words: '',
      }
    })

    return
  }

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
