import { DISCLAIMER_MESSAGE } from '../constants';

function Footer() {
  return (
    <div className="absolute bottom-0 bg-slate-100 flex w-full border-t border-t-gray-500 border-solid justify-center">
      <header className="flex flex-col max-w-5xl w-full p-4 items-center gap-2">
        <p className="text-center">
          ساخته شده توسط{' '}
          <a
            className="text-blue-600 cursor-pointer"
            href="https://twitter.com/maryayi"
            target="_blank"
            rel="noopener noreferrer"
          >
            مهدی آریایی
          </a>{' '}
          -{' '}
          <a
            className="text-blue-600 cursor-pointer"
            href="https://github.com/maryayi/tax-calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            کد منبع
          </a>
        </p>
        <p className="text-center text-gray-500">{DISCLAIMER_MESSAGE}</p>
      </header>
    </div>
  );
}

export default Footer;
