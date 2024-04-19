import { test, expect } from "@playwright/test"
import helpers from "../helpers.spec"

test.describe("User sign up", () => {
  test.beforeEach(async ({ page, request }) => {
    const email = "testuser3@test.com"
    const username = "testuser3"
    const password = "password"
    await request.post("/api/testing/reset")
    await helpers.login({ page, request, email, password, username })
  })

  test("Creating, viewing, updating, and deleting servers work", async ({
    page,
  }) => {
    // create a new server
    await page.getByTestId("Add a Server").click()
    await page.getByTestId("new-server-name").fill("My new server!")
    await page.getByRole("button", { name: /^Create$/ }).click()

    // edit server name
    const serverLink = page.getByTestId("My new server!")
    await serverLink.click()
    await page.getByTestId("channelbar-header").click()
    await page.getByText("Edit Server").click()
    await page.getByTestId("edit-server-name").fill(" My edited server! ")
    await page.getByRole("button", { name: /^Edit$/ }).click()

    // delete the server
    await page.getByTestId("channelbar-header").click()
    await page.getByText("Delete Server").click()

    await expect(page).toHaveURL("/channels/@me")
  })
})
