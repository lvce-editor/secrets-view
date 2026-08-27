import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-sort-key'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([
    { extensionId: 'sample.extension', key: 'refresh-token', value: 'refresh-secret' },
    { extensionId: 'sample.extension', key: 'access-token', value: 'access-secret' },
    { extensionId: 'sample.extension', key: 'client-secret', value: 'client-secret' },
  ])

  await expect(SecretsView.key(0)).toHaveValue('access-token')
  await expect(SecretsView.key(1)).toHaveValue('client-secret')
  await expect(SecretsView.key(2)).toHaveValue('refresh-token')
}
