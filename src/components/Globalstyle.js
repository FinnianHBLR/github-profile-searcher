import { createGlobalStyle } from "styled-components"

// 
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    a {
      color: ${({ theme }) => theme.link};
    }
    .themeSetterBtn {
      color: ${({ theme }) => theme.themeSetterBtnColor};
      background-color: ${({ theme }) => theme.themeSetterBtnBackground}
    }
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.40s linear;
  }
`