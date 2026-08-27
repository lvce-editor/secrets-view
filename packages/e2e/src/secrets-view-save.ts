import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-save'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([{ extensionId: 'save.extension', key: 'token', value: 'initial-secret' }])

  await SecretsView.edit(0)
  await SecretsView.value(0).type('-updated')
  await SecretsView.save(0)
  await expect(SecretsView.value(0)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
  await expect(SecretsView.row(0).locator('[aria-label="Edit"]')).toBeVisible()
}
