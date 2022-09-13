import styled from "styled-components";
import { cl } from "./color";
import { breakpoint, font, sp } from "./commonStyles";

export const ContentWrapper = styled.div`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: ${sp._64} auto;
  max-width: 640px;
  padding: 0;
`;

export const NavButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: ${sp._8} 0 ${sp._16} 0;

  > a,
  button {
    justify-content: center;
    margin: ${sp._8} 0;
    flex: 1;
  }

  ${breakpoint.s} {
    flex-direction: row-reverse;

    > a,
    button {
      margin: ${sp._8};
      flex: none;
    }
  }
`;

export const StartScreenWrapper = styled(ContentWrapper)`
  text-align: center;

  header i {
    color: ${cl.blue.reg};
    font-size: ${sp._64};
    margin-bottom: ${sp._16};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TrackerWrapper = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  margin-top: ${sp._64};
  color: ${cl.grey.reg};
`;

export const TimerWrapper = styled.div`
  color: ${cl.grey.dark};
  font-weight: ${font.weight.semi};

  i {
    width: ${sp._16};
    font-weight: ${font.weight.regular};
  }
`;

export const TitleStyles = styled.p`
  margin-bottom: ${sp._32};
`;
