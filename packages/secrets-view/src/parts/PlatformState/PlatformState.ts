const state = { platform: 0 }

export const get = (): number => {
  const { platform } = state
  return platform
}

export const set = (platform: number): void => {
  state.platform = platform
}
