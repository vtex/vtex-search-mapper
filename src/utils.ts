export function last<T extends unknown>(arr: T[], defaultValue: T): T {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return defaultValue
  }

  return arr[arr.length - 1]
}

function leftPad(n: number): string {
  if (n < 0) {
    return ''
  }

  if (n < 10) {
    return `0${n}`
  }

  return n.toString()
}

export function getDateStringFromTimestamp(epochTimestamp: number): string {
  if (!epochTimestamp) {
    return ''
  }

  const date = new Date(epochTimestamp)

  const day = leftPad(date.getUTCDate())
  const month = leftPad(date.getUTCMonth() + 1)
  const year = leftPad(date.getUTCFullYear())
  const hours = leftPad(date.getUTCHours())
  const minutes = leftPad(date.getUTCMinutes())
  const seconds = leftPad(date.getUTCSeconds())

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

export function mergeProps<T, T2, K extends keyof T & keyof T2>(
  props1: T,
  props2: T2,
  { keys, defaultValue }: { keys: string[]; defaultValue: unknown }
): Pick<T, K> {
  const finalProps: Record<string, unknown> = {}

  keys.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    finalProps[key] = props1[key as K] || props2[key as K] || defaultValue
  })

  return finalProps as Pick<T, K>
}

export function isNil(value: unknown) {
  return value == null
}
