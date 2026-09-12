import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-empty'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([])

  await expect(SecretsView.rows()).toHaveCount(0)
  const emptyMessage = SecretsView.root().locator('.SecretsViewEmpty')
  await expect(emptyMessage).toBeVisible()
  await expect(emptyMessage).toHaveText('No secrets stored.')
}
