import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-masked'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([{ extensionId: 'sample.extension', key: 'access-token', value: 'plain-text-secret' }])

  await expect(SecretsView.root()).toBeVisible()
  await expect(SecretsView.rows()).toHaveCount(1)
  await expect(SecretsView.extensionId(0)).toHaveValue('sample.extension')
  await expect(SecretsView.key(0)).toHaveValue('access-token')
  await expect(SecretsView.value(0)).toHaveAttribute('type', 'password')
  await expect(SecretsView.value(0)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
}
