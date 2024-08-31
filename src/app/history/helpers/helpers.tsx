import { InaccuracyProps, InaccuracyType } from '@/types/HistoryOfChecks'
import InaccuracyHighlight from '@/app/history/components/InaccurracyHighlight'
import React from 'react'

export const inaccuraciesColors = {
  error: '#F1361D',
  warning: '#FFB545'
}

export const inaccuraciesBgColors = {
  error: 'rgba(241, 54, 29, 0.2)',
  warning: 'rgba(255, 181, 69, 0.2)'
}

export const getInaccuracyColor = (type: InaccuracyType) => {
  return type === 'error' ? inaccuraciesColors.error : inaccuraciesColors.warning
}

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special characters for use in a regex
}

export const getMarkedText = (text: string, inaccuracies: InaccuracyProps[]) => {
  if (!inaccuracies || inaccuracies.length === 0) {
    return text
  }

  let result: (React.JSX.Element | string)[] = [text]

  inaccuracies.forEach(inaccuracy => {
    const { cardSubstring, type } = inaccuracy
    const escapedSubstring = escapeRegExp(cardSubstring) // Escape the substring before using it in a regex

    result = result.flatMap(part => {
      if (typeof part === 'string') {
        // Split the string only if it's a string and contains the escapedSubstring
        return part.split(new RegExp(`(${escapedSubstring})`, 'gi')).map((chunk, index) =>
          chunk.toLowerCase() === cardSubstring.toLowerCase() ? (
            <InaccuracyHighlight key={index} type={type}>
              {chunk}
            </InaccuracyHighlight>
          ) : (
            chunk
          )
        )
      }
      return part // If part is already a JSX element, return it as is
    })
  })

  return result
}
