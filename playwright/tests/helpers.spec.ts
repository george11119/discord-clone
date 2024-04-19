import { APIRequestContext, expect, Page } from "@playwright/test"

const login = async ({
  page,
  request,
  email,
  username,
  password,
}: {
  page: Page
  request: APIRequestContext
  email: string
  username: string
  password: string
}) => {
  await request.post("/api/users", {
    data: {
      email,
      username,
      password,
    },
  })

  await page.goto("/login")

  const emailInput = page.getByTestId("email-input")
  const passwordInput = page.getByTestId("password-input")

  await emailInput.fill(email)
  await passwordInput.fill(password)

  await page.getByText("Log in").click()

  await expect(page).toHaveURL("/channels/@me")
  await expect(page.getByText(username)).toBeVisible()
}

const helpers = { login }

export default helpers
