import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-empty'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([])

  await expect(SecretsView.rows()).toHaveCount(0)
  await expect(SecretsView.root().locator('.SecretsViewEmpty')).toBeVisible()
  await expect(SecretsView.root().locator('.SecretsViewEmpty')).toHaveText('No secrets stored.')
}
