import { default as BigCommerceCart } from 'bigCommerceComponents/cart';
import { default as BigCommerceSearch } from 'bigCommerceComponents/layout/navbar/search';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { BUILDER_KEY } from 'lib/constants';
import { default as MagentoCart } from 'magentoComponents/cart';
import { default as MagentoSearch } from 'magentoComponents/layout/navbar/search';
import Link from 'next/link';
import { Suspense } from 'react';
const { SITE_NAME, ECOMMERCE_PLATFORM } = process.env;

import { builder } from '@builder.io/sdk';
// See the full code: https://www.builder.io/c/docs/integrate-section-building?codeFramework=nextApp#add-an-announcement-bar-section-to-your-app
import { RenderBuilderContent } from 'components/builderSection/builderComponent';

declare var process: {
  env: {
    BUILDER_PUBLIC_KEY: string;
    NEXT_PUBLIC_VERCEL_URL: string;
    SITE_NAME: string;
    ECOMMERCE_PLATFORM: string;
  };
};

// Replace with your Public API Key
builder.init(BUILDER_KEY);

export default async function Navbar() {
  const navigationContent = await builder
    // Get the page content from Builder with the specified options
    .get('navigation', {
      options: {
        includeUnpublished: false
      },
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: '/'
      },
      // Set prerender to false to prevent infinite rendering loops
      prerender: false
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <nav className="border-b border-black/30 p-4">
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full">
            <Link
              href="/"
              className="order-1 mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoSquare />
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
            <div className="order-none font-normal leading-[32px] lg:order-1 lg:ml-[20px] xl:ml-[65px]">
              <RenderBuilderContent model="navigation" content={navigationContent} />
            </div>
          </div>
          <div className="relative hidden justify-center md:flex">
            {ECOMMERCE_PLATFORM?.toLocaleLowerCase() === 'magento' ? (
              <MagentoSearch />
            ) : (
              <BigCommerceSearch />
            )}
          </div>
          <div className="ml-8 flex justify-end">
            {ECOMMERCE_PLATFORM?.toLocaleLowerCase() === 'magento' ? (
              <Suspense fallback={<OpenCart />}>
                <MagentoCart />
              </Suspense>
            ) : (
              <Suspense fallback={<OpenCart />}>
                <BigCommerceCart />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
