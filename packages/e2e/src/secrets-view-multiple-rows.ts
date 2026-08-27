import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-multiple-rows'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([
    { extensionId: 'alpha.extension', key: 'access-token', value: 'alpha-secret' },
    { extensionId: 'beta.extension', key: 'api-key', value: 'beta-secret' },
    { extensionId: 'gamma.extension', key: 'password', value: 'gamma-secret' },
  ])

  await expect(SecretsView.rows()).toHaveCount(3)
  await expect(SecretsView.extensionId(0)).toHaveValue('alpha.extension')
  await expect(SecretsView.key(1)).toHaveValue('api-key')
  await expect(SecretsView.extensionId(2)).toHaveValue('gamma.extension')
}
