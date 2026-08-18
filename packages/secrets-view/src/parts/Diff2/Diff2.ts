import * as SecretsViewStates from '../SecretsViewStates/SecretsViewStates.ts'

export const diff2 = (uid: number): readonly number[] => SecretsViewStates.diff(uid, [(): boolean => false], [1])
