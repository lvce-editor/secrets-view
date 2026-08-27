/* eslint-disable e2e/no-direct-click -- The SecretsView test API does not expose the new view-level and delete actions yet. */
import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-stage-delete'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([
    { extensionId: 'first.extension', key: 'token', value: 'first-secret' },
    { extensionId: 'second.extension', key: 'token', value: 'second-secret' },
  ])

  await expect(SecretsView.root().locator('[name="delete:0"]')).toHaveCount(0)
  await SecretsView.root().locator('[name="edit"]').click()
  await SecretsView.row(0).locator('[name="delete:0"]').click()
  await expect(SecretsView.rows()).toHaveCount(1)
  await expect(SecretsView.extensionId(0)).toHaveValue('second.extension')
  await SecretsView.root().locator('[name="cancel"]').click()
  await expect(SecretsView.rows()).toHaveCount(2)
}
