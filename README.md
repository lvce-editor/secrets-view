# Secrets View

Worker-backed LVCE Editor view for inspecting extension secret names and securely editing encrypted values.

Values are never loaded while the view is read-only. A value is fetched only after an explicit Edit action and is rendered in a password input until it is saved or cancelled.
