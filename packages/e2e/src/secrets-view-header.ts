import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-header'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([])

  await expect(SecretsView.root().locator('.SecretsViewTitle')).toHaveText('Secrets')
  await expect(SecretsView.root().locator('.SecretsViewDescription')).toHaveText(
    'Stored extension secrets are encrypted. Values stay hidden until you choose Edit.',
  )
}
