/* eslint-disable e2e/no-direct-click -- The SecretsView test API does not expose the new reveal action yet. */
import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-reveal-isolated-row'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([
    { extensionId: 'first.extension', key: 'token', value: 'first-secret' },
    { extensionId: 'second.extension', key: 'token', value: 'second-secret' },
  ])

  await SecretsView.row(1).locator('[name="reveal:1"]').click()
  await expect(SecretsView.value(0)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
  await expect(SecretsView.value(1)).toHaveAttribute('readonly', '')
  await expect(SecretsView.value(1)).toHaveAttribute('type', 'text')
  await expect(SecretsView.value(1)).toHaveValue('second-secret')
  await SecretsView.row(1).locator('[name="reveal:1"]').click()
  await expect(SecretsView.value(1)).toHaveAttribute('type', 'password')
  await expect(SecretsView.value(1)).toHaveValue('••••••••••••')
}
