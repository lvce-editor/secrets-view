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
  const editButton = SecretsView.root().locator('[aria-label="Edit secrets"]')
  await expect(editButton).toBeVisible()
  const toolbar = SecretsView.row(0).locator('[role="toolbar"]')
  await expect(toolbar).toHaveAttribute('aria-label', 'Actions for secret first.extension / token')
  const showButton = SecretsView.row(0).locator('[aria-label="Show secret first.extension / token"]')
  await expect(showButton).toBeVisible()
  const copyButton = SecretsView.row(0).locator('[aria-label="Copy secret first.extension / token"]')
  await expect(copyButton).toBeVisible()
  const deleteButton = SecretsView.row(0).locator('[aria-label="Delete secret first.extension / token"]')
  await expect(deleteButton).toHaveCount(0)
}
