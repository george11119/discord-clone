import { test, expect } from "@playwright/test"

test.describe("User sign up", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset")
    await page.goto("/signup")
  })

  test("Sign up works", async ({ page }) => {
    const emailInput = page.getByTestId("email-input")
    const usernameInput = page.getByTestId("username-input")
    const passwordInput = page.getByTestId("password-input")

    await emailInput.fill("test2@test.com")
    await usernameInput.fill("testuser2")
    await passwordInput.fill("password")

    await page.getByText("Continue").click()

    await expect(page).toHaveURL("/channels/@me")
    await expect(page.getByText("testuser2")).toBeVisible()
  })
})
