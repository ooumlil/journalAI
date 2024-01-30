import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
    </div>
  );
}
