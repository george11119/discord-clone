import { expect, test } from "@playwright/test"

test.describe("User login", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset")
    await request.post("/api/users", {
      data: {
        email: "test1@test.com",
        username: "testuser1",
        password: "password",
      },
    })

    await page.goto("/login")
  })

  test("Login works", async ({ page }) => {
    const emailInput = page.getByTestId("email-input")
    const passwordInput = page.getByTestId("password-input")

    await emailInput.fill("test1@test.com")
    await passwordInput.fill("password")

    await page.getByText("Log in").click()

    await expect(page).toHaveURL("/channels/@me")
    await expect(page.getByText("testuser1")).toBeVisible()
  })
})
