/* eslint-disable e2e/no-direct-click -- The SecretsView test API still targets the removed row-level Edit action. */
import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-set-data-while-editing'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([{ extensionId: 'old.extension', key: 'old-token', value: 'old-secret' }])
  await SecretsView.root().locator('[name="edit"]').click()
  await SecretsView.value(0).type('-changed')

  await SecretsView.setData([{ extensionId: 'new.extension', key: 'new-token', value: 'new-secret' }])
  await expect(SecretsView.rows()).toHaveCount(1)
  await expect(SecretsView.extensionId(0)).toHaveValue('new.extension')
  await expect(SecretsView.key(0)).toHaveValue('new-token')
  await expect(SecretsView.value(0)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
}
