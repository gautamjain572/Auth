import { FC, ReactNode } from 'react';
import { Button } from './ui/button';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <form action="">
      <Button onClick={loginWithGoogle} className='w-full'>
        {children}
      </Button>
    </form>
  );
};

export default GoogleSignInButton;
