import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

export const name = 'secrets-view-sort-extension-id'

export const test: Test = async ({ expect, SecretsView }: TestApi) => {
  await SecretsView.show()
  await SecretsView.setData([
    { extensionId: 'zebra.extension', key: 'token', value: 'zebra-secret' },
    { extensionId: 'alpha.extension', key: 'token', value: 'alpha-secret' },
    { extensionId: 'middle.extension', key: 'token', value: 'middle-secret' },
  ])

  await expect(SecretsView.extensionId(0)).toHaveValue('alpha.extension')
  await expect(SecretsView.extensionId(1)).toHaveValue('middle.extension')
  await expect(SecretsView.extensionId(2)).toHaveValue('zebra.extension')
}
