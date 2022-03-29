import styled, {createGlobalStyle} from 'styled-components'

export const Container = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0 0.1rem;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1280px;
  }
`
const GlobalStyles = createGlobalStyle`
  .ant-layout {
      background: #fff;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

`
export default GlobalStyles;
