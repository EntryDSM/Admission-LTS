import * as _ from './style';
import LogoOrange from '../../assets/LogoOrange.svg';
import { Text } from '@team-entry/design_system';

const Header = () => {
  return (
    <_._HeaderContainer>
      <div style={{ minWidth: '60rem' }}>
        <_._LogoButton
          onClick={() => {
            window.location.href = 'https://www.entrydsm.hs.kr/';
          }}
        >
          <img src={LogoOrange} alt="" style={{ width: '35px', height: '48px', marginRight: 12, cursor: 'pointer' }} />
          <Text color="realBlack" size="header1">
            EntryDSM
          </Text>
        </_._LogoButton>
      </div>
    </_._HeaderContainer>
  );
};

export default Header;
