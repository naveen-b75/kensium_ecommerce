import { isVercelCommerceError } from 'lib/type-guards';
import { NextRequest, NextResponse } from 'next/server';
import { setPaymentMethod } from '../../../../lib/magento';
function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}
export async function POST(req: NextRequest): Promise<Response> {
  const { cartId, paymentMethod } = await req.json();
  try {
    const response = await setPaymentMethod(cartId, paymentMethod);
    //const createEmptyCart = await createAndSetCookie();
    return NextResponse.json({ status: 204, body: response });
  } catch (e) {
    if (isVercelCommerceError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }
    // Use status 500 (Internal Server Error) for other server-related errors
    // we can't directly pass the error message coming from the api.
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
