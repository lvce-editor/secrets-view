import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-header'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([])

  const title = SecretsView.root().locator('.SecretsViewTitle')
  await expect(title).toHaveText('Secrets')
  const description = SecretsView.root().locator('.SecretsViewDescription')
  await expect(description).toHaveText(
    'Stored extension secrets are encrypted. Reveal or copy a value explicitly; choose Edit to update or delete secrets.',
  )
}
