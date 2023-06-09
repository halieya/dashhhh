import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const localStorage = window.localStorage;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL+'/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        const { error } = await response.json();
        setErrorMessage(error);
      }
    } catch (error) {
      setErrorMessage('Failed to sign in. Please try again.');
    }
  };
  
  return (
    <div className='min-h-full flex items-center justify-center mt-32 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'> 
            <div>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
                <p className='mt-2 text-center text-sm text-gray-600 '>
                    Or
                    <a href="#" className='font-medium text-darkBrand hover:text-brand px-2'>Sign Up</a>
                </p>
            </div>
            <form  onSubmit={handleSubmit} className='mt-8 space-y-6'>
                <div className='rounded-md shadow-sm -space-y-px'>
                    <div>
                        <input type="text" id="username" value={username}  onChange={(event) => setUsername(event.target.value)} autoComplete='none' required className='appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'placeholder='Username'/> 
                    </div>

                    <div>
                        <input type="password" id="password"  value={password} onChange={(event) => setPassword(event.target.value)} autoComplete='none' required className='appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 placeholder-gray-500
                        text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'placeholder='Password'/> 
                    </div>

                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <input type="checkbox" className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'/>
                        <label className='ml-2 block text-sm text-gray-900'>Remember me</label>
                    </div>
                    <div>
                        <a href="#" className='font-medium text-darkBrand hover:text-brand'>Forgot your password </a>
                    </div>

                    
                </div>
                <div>
                <button  type="submit" className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus;outline-none focus:ring-2 focus:ring-offset-2 bg-brand'>Sign in</button> 
                </div>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    </div>
   
  );
}


