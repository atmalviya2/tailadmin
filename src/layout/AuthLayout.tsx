import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../images/logo/logo-dark.svg';
import Logo from '../images/logo/logo.svg';
import AuthImage from '../images/icon/auth-img.svg';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap justify-center items-center h-screen">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>
            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
            </p>
            <span className="mt-15 inline-block">
              <img src={AuthImage} alt="auth image" />
            </span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              {title}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 