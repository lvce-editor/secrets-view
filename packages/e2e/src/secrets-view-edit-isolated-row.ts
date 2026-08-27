import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-edit-isolated-row'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([
    { extensionId: 'first.extension', key: 'token', value: 'first-secret' },
    { extensionId: 'second.extension', key: 'token', value: 'second-secret' },
  ])

  await SecretsView.edit(1)
  await expect(SecretsView.value(0)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
  await expect(SecretsView.value(1)).not.toHaveAttribute('readonly', '')
  await expect(SecretsView.value(1)).toHaveValue('second-secret')
}
