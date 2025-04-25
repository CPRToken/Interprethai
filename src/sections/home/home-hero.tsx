import type { FC } from 'react';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import {useTranslation} from "react-i18next";
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import {typography } from "src/theme/typography";
import { useTheme } from '@mui/material/styles';
import {tokens} from "src/locales/tokens";



export const HomeHero: FC = () => {
  const theme = useTheme();  // Use the theme

  const { t } = useTranslation();


    return (
      <Box
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            backgroundImage: theme.palette.mode === 'dark'
              ? 'linear-gradient(rgba(0, 0, 139, 0.10), rgba(0, 0, 139, 0.2)), url("/assets/interbglight.png")'
              : 'linear-gradient(rgba(255, 255, 255, 0.60), rgba(255, 255, 255, 0.3)), url("/assets/interbgdark.png")',
            pt: '40px',
            pb: '10px',
            height: '60vh', // Default to 70% of the viewport height
            width: 'cover',
            marginBottom: '-90px', // 👈 Add this line
            '@media (max-width:600px)': {
              height: '50vh', // Adjust height for xs screens

            },
            '@media (min-width:600px) and (max-width:899px)': {

            },

          }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              pt: { xs: 0, sm: 0, md: 4, lg: 5 },
              pb: { xs: 1, sm: 2, md: 3, lg: 4 },
            }}
          >
            <Stack
              direction="column"
              // Single column for xs to md, row for lg and xl
              justifyContent="space-between"
              textAlign={{ xs: 'center', lg: 'left' }}  // Center text on xs to md, left on lg and xl
              spacing={2}
              sx={{
                my: 2,
                width: '100%'
              }}
            >
              {/* Column 1 */}
              <Box
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  mt: { xs: 3, sm: 2, md: 1 },
                  pt: { xs: 2, sm: 2, md: 1 },
                }}
              >

              <Typography
                  sx={{
                    ...typography.h3,
                    color: 'text.primary',
                    mt: { xs: 3,  md: 3, lg: 3 },  // Adjust top margin for mobile
                    pt: { xs: 3, lg: 5 },
                    mb: 0,
                    textAlign: 'center'
                  }}
                >
                  {t(tokens.headings.Heading)}
                </Typography>


                <Typography
                  sx={{
                    ...typography.body1,
                    color: 'text.primary',
                    mt: { xs: 2, sm: 4 },  // Adjust top margin for mobile
                    pt: 1,
                    mb: 0
                  }}
                >
                  {t(tokens.form.brainiacIntro)}
                </Typography>
              </Box>


            </Stack>
          </Box>
        </Container>


      </Box>
  );
};
