/* eslint-disable e2e/no-direct-click -- The SecretsView test API still targets the removed row-level Edit action. */
import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-view-level-edit'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([
    { extensionId: 'first.extension', key: 'token', value: 'first-secret' },
    { extensionId: 'second.extension', key: 'token', value: 'second-secret' },
  ])

  await SecretsView.root().locator('[name="edit"]').click()
  await expect(SecretsView.value(0)).not.toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('first-secret')
  await expect(SecretsView.value(1)).not.toHaveAttribute('readonly', '')
  await expect(SecretsView.value(1)).toHaveValue('second-secret')
  await expect(SecretsView.row(0).locator('[name="delete:0"]')).toBeVisible()
  await expect(SecretsView.row(1).locator('[name="delete:1"]')).toBeVisible()
}
