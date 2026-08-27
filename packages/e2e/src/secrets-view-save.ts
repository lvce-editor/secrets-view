/* eslint-disable e2e/no-direct-click -- The SecretsView test API still targets the removed row-level actions. */
import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-save'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([{ extensionId: 'save.extension', key: 'token', value: 'initial-secret' }])

  await SecretsView.root().locator('[name="edit"]').click()
  await SecretsView.value(0).type('-updated')
  await SecretsView.root().locator('[name="save"]').click()
  await expect(SecretsView.value(0)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
  await expect(SecretsView.root().locator('[aria-label="Edit secrets"]')).toBeVisible()
}
