import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-edit'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([{ extensionId: 'sample.extension', key: 'access-token', value: 'plain-text-secret' }])

  await SecretsView.edit(0)
  await expect(SecretsView.value(0)).not.toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('plain-text-secret')
  await SecretsView.value(0).type('-updated')
  await SecretsView.cancel(0)
  await expect(SecretsView.value(0)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
}
