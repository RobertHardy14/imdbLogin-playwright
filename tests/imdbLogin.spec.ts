import { test, expect } from '@playwright/test'
import path from 'path'

test.beforeEach('go to webpage', async ({ page }) => {
    await page.goto('https://www.imdb.com/')
    await expect(page).toHaveTitle(/IMDb/)
    require('dotenv').config()
    // console.log('If you can see this the process.env works', process.env)
})

test('Search in IMDB', async ({ page }) => {
    const searchBar = await page.getByPlaceholder('Search IMDb')
    await searchBar.click()
    await searchBar.fill('The Penguin')
    await page.locator('#react-autowhatever-navSuggestionSearch--item-1').click()
})

test('IMDb Login', async ({ page }) => {
    const signInButton = await page.locator('.nav__userMenu .imdb-header__signin-text')
    await signInButton.click()
    await page.getByLabel('Sign In')
    await page.getByText('Sign in with IMDb').click()
    await page.getByLabel('Sign in')
    const emailForm = await page.locator('#ap_email')
    await emailForm.click()
    await emailForm.pressSequentially(process.env.EMAIL)
    const passwordForm = await page.locator('#ap_password')
    await passwordForm.click()
    await passwordForm.pressSequentially(process.env.PASS)
    await page.getByRole('button', { name: 'Sign in' }).click()
    // console.log(path.resolve(__dirname, '.env'));
})