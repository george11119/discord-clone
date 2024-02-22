import SignupForm from "./SignupForm.tsx"

const SignupPage = () => {
  const handleSignup = (
    username: string,
    password: string,
    email: string,
  ): void => {
    console.log(email)
    console.log(username)
    console.log(password)
  }

  return <SignupForm handleSignup={handleSignup} />
}

export default SignupPage
