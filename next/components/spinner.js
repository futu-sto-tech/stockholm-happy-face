import styled from 'styled-components'

const Spinner = styled.div`
  width: ${props => props.theme.global.edgeSize.medium};
  height: ${props => props.theme.global.edgeSize.medium};
  border: ${props => props.theme.global.borderSize.small} solid
    ${props => props.theme.global.colors.border.dark};
  border-radius: 50%;
  border-top-color: ${props => props.theme.global.colors.brand};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export default Spinner
