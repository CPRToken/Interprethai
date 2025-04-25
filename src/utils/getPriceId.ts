// utils/getPriceId.ts
import { tokens } from "../locales/tokens";

export const getPriceId = (plan: string, t?: (key: string) => string): string => {
  if (plan === 'Restricted') return t ? t(tokens.form.priceBasic) : 'price_1RHmsiI7exj9oAo9kJhsytRX';
  if (plan === 'Unlimited') return t ? t(tokens.form.pricePremium) : 'price_1RHmumI7exj9oAo9Bt5uHZwv';

  if (plan === 'RestrictedYearly') return t ? t(tokens.form.priceBasicYearly) : 'price_1RHn0MI7exj9oAo9Mgm5zW2r';
  if (plan === 'UnlimitedYearly') return t ? t(tokens.form.pricePremiumYearly) : 'price_1RHn4RI7exj9oAo9mj6zxbJG';

  if (plan === 'Canceled') return 'price_canceled';
  if (plan === 'CancelPending') return 'price_cancel_pending';

  throw new Error(`Unknown plan: ${plan}`);
};
