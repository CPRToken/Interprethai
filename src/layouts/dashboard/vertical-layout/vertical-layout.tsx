import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import { styled } from '@mui/material/styles';

import type { NavColor } from 'src/types/settings';

import type { Section } from '../config';
import { MobileNav } from '../mobile-nav';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { useMobileNav } from './use-mobile-nav';

const SIDE_NAV_WIDTH = 270;
const BOTTOM_NAV_PADDING = 80;
const VerticalLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
    paddingBottom: BOTTOM_NAV_PADDING,
  },
}));

const VerticalLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',

});

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const mobileNav = useMobileNav();

  return (
    <>
      <TopNav onMobileNavOpen={mobileNav.handleOpen} />
      {lgUp && (
        <SideNav
          color={navColor}
          sections={sections}
        />
      )}
      {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
          sections={sections}
        />
      )}
      <VerticalLayoutRoot>
        <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  );
};

VerticalLayout.propTypes = {

  navColor: PropTypes.oneOf<NavColor>(['blend-in', 'discrete', 'evident']),
  sections: PropTypes.array,
};
