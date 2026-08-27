/* eslint-disable e2e/no-direct-click -- The SecretsView test API still targets the removed row-level Edit action. */
import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-edit'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([{ extensionId: 'sample.extension', key: 'access-token', value: 'plain-text-secret' }])

  await SecretsView.root().locator('[name="edit"]').click()
  await expect(SecretsView.value(0)).not.toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('plain-text-secret')
  await SecretsView.value(0).type('-updated')
  await SecretsView.root().locator('[name="cancel"]').click()
  await expect(SecretsView.value(0)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
}
