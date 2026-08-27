import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-list-accessibility'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([
    { extensionId: 'first.extension', key: 'token', value: 'first-secret' },
    { extensionId: 'second.extension', key: 'token', value: 'second-secret' },
  ])

  const list = SecretsView.root().locator('.SecretsViewList')
  await expect(list).toHaveAttribute('role', 'list')
  await expect(list).toHaveAttribute('aria-label', 'Stored secrets')
  await expect(SecretsView.rows().first()).toHaveAttribute('role', 'listitem')
  await expect(SecretsView.extensionId(0)).toHaveAttribute('tabindex', '-1')
  await expect(SecretsView.key(0)).toHaveAttribute('tabindex', '-1')
  await expect(SecretsView.value(0)).toHaveAttribute('tabindex', '-1')
  await expect(SecretsView.root().locator('[aria-label="Edit secrets"]')).toBeVisible()
  await expect(SecretsView.row(0).locator('[role="toolbar"]')).toHaveAttribute('aria-label', 'Actions for secret first.extension / token')
  await expect(SecretsView.row(0).locator('[aria-label="Show secret first.extension / token"]')).toBeVisible()
  await expect(SecretsView.row(0).locator('[aria-label="Copy secret first.extension / token"]')).toBeVisible()
  await expect(SecretsView.row(0).locator('[aria-label="Delete secret first.extension / token"]')).toHaveCount(0)
}
