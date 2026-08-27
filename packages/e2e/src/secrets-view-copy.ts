/* eslint-disable e2e/no-direct-click -- The SecretsView test API does not expose the new copy action yet. */
import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-copy-without-reveal'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([{ extensionId: 'sample.extension', key: 'token', value: 'plain-text-secret' }])

  await SecretsView.row(0).locator('[name="copy:0"]').click()
  await expect(SecretsView.value(0)).toHaveAttribute('type', 'password')
  await expect(SecretsView.value(0)).toHaveValue('••••••••••••')
}
