import md5 from 'md5'

import {
  CREATE,
  REGISTER,
  UPDATE,
  _GROUP,
  _RIGHT,
  _SPELLING,
  _STATS,
  _WRONG,
} from '../constants'

export default (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case CREATE + _GROUP + _STATS: {
      let { id, words } = data.group
      let newGroup = makeGroupStats(id, words)

      return {
        ...state,
        groups: cloneGroups(state).concat(newGroup)
      }
    }

    case UPDATE + _GROUP + _STATS: {
      let { id, words } = data.group
      let clonedGroups = cloneGroups(state)
      let currentGroup = clonedGroups.find(item => item.id === id)

      updateGroupStats(currentGroup, words)

      return {
        ...state,
        groups: clonedGroups,
      }
    }

    case REGISTER + _RIGHT + _SPELLING: {
      let clonedGroups = cloneGroups(state)
      let currentGroup = clonedGroups.find(item => item.id === data.groupId)
      let currentWord = currentGroup.words.find(item => item.id === data.wordId)

      currentWord.tries += 1

      return {
        ...state,
        groups: clonedGroups,
      }
    }

    case REGISTER + _WRONG + _SPELLING: {
      let clonedGroups = cloneGroups(state)
      let currentGroup = clonedGroups.find(item => item.id === data.groupId)
      let currentWord = currentGroup.words.find(item => item.id === data.wordId)

      currentWord.tries += 1
      currentWord.fails += 1

      return {
        ...state,
        groups: clonedGroups,
      }
    }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    groups = [],
  } = data || {}

  return {
    groups
  }
}

export function serializeState(data) {
  return data
}

function cloneGroups(state) {
  return state.groups.map(item => ({
    ...item,
    words: cloneWords(item.words),
  }))
}

function cloneWords(words) {
  return words.map(item => ({...item}))
}

function makeGroupStats(id, wordText) {
  return {
    id,
    words: parseWords(wordText)
  }
}

/*
  text: comma-separated words

  Function returns array of objects: [{
    id,
    word,
    tries, // number of tries
    fails, // number of fails
  }]
*/
function parseWords(wordText) {
  return wordText.split(',')
    .map(string => {
      const word = string.trim()

      return {
        id: md5(word),
        word,
        tries: 0,
        fails: 0,
      }
    })
}

function updateGroupStats(group, wordText) {
  const { words } = group
  const wordIds = words.map(item => item.id)

  wordText.split(',')
    .forEach(string => {
      const word = string.trim()
      const id = md5(word)

      if (!wordIds.includes(id)) {
        words.concat({
          id,
          word,
          tries: 0,
          fails: 0,
        })
      }
    })

  Object.assign(group, {words})
}
