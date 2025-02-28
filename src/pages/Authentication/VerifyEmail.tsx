import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import AuthImage from '../../images/icon/auth-img.svg';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-email`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ token }),
        // });

        // if (response.ok) {
        //   navigate('/auth/signin');
        // } else {
        //   navigate('/auth/signup');
        // }
         // Temporarily commented out for testing
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-email`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ token }),
        // });
        const response = {
          ok: false,
        };
        
        // Simulate API delay
        setTimeout(() => {
          if (response.ok) {
            console.log('Email verified successfully!');
            // fireToast('Success', 'Email verified successfully!', 0);
            navigate('/auth/signin');
          } else {
            // fireToast('Error', 'Invalid or expired verification link', 1);
            // navigate('/auth/signup');
          }
          setVerifying(false);
        }, 3000);
      } catch (error) {
        navigate('/auth/signup');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>

            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>

            <span className="mt-15 inline-block">
              <img src={AuthImage} alt="auth image" />
            </span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Email Verification
            </h2>
            {verifying ? (
              <div className="text-center">
                <div className="mb-4">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent mx-auto"></div>
                </div>
                <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                  Verifying your email...
                </h3>
                <p className="text-gray-500">
                  Please wait while we verify your email address.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;