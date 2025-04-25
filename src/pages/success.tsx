import {Success} from 'src/sections/components/detail-lists/success';
import { Seo } from 'src/components/seo';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import type { Profile } from 'src/types/social';
import { db } from 'src/libs/firebase';
import { socialApi } from 'src/api/social/socialApi';
import { usePageView } from 'src/hooks/use-page-view';
import { Typography } from '@mui/material';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { Previewer } from 'src/sections/components/previewer';
import {tokens} from "../locales/tokens";
import {useTranslation} from "react-i18next";
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';




const Page: NextPage = () => {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const { t } = useTranslation();




  const fetchProfile = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userProfile = await socialApi.getProfile({ uid: user.uid });
        setProfile(userProfile);
      } else {
        console.error('User not authenticated');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const updatePlan = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && profile) {
        const userDocRef = doc(db, 'users', user.uid);
        const priceId = profile.priceId;

        if (priceId) {
          const plan = productIdToPlan(priceId);
          const planStartDate = new Date().toISOString();
          await updateDoc(userDocRef, {
            plan,
            planStartDate: planStartDate
          });

          console.log(`User plan updated to ${plan} with start date ${planStartDate}`);
          router.push('/dashboard');
        } else {
          console.error('Price ID not found');
        }
      } else {
        console.error('User not authenticated or profile not loaded');
      }
    };

    updatePlan();
  }, [profile]);


  usePageView();

  return (
    <>
      <Seo title="Success - Subscription" />
      <Box component="main" sx={{ flexGrow: 1, py: 8, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h5"
                      sx={{ flexGrow: 1, py: 2, mt: 3, mb:3 }}>
            {t(tokens.headings.success)}</Typography>


          <Success/>
        </Container>
      </Box>

    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
function productIdToPlan(priceId: string): string {
  const priceToPlan: Record<string, string> =

    {
      'price_1RHnZSI7exj9oAo9bQh8kpmY': 'Basic',
      'price_1RHnbeI7exj9oAo9FRiFZ0Hn': 'Premium',

      'price_1RHnagI7exj9oAo9MDgX1gFh': 'BasicYearly',
      'price_1RHncZI7exj9oAo9J9m5yGxh': 'PremiumYearly',


      'price_1QNpX8I7exj9oAo9erM3juYm': 'Basic',
      'price_1QNpV9I7exj9oAo9Aq2lz9Uz': 'Premium',


      'price_canceled': 'Canceled'
    };

  return priceToPlan[priceId] || 'Unknown';
}

