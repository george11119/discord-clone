import { test, expect } from "@playwright/test"

test.describe("User sign up", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup")
  })

  test("User sign up works", async ({ page }) => {})
})
