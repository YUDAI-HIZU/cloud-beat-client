import { ReactNode } from "react";
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import Container from '@material-ui/core/Container';

interface Props {
  children: ReactNode;
}

const Default = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Container
        disableGutters={ true }
        maxWidth={ false }
      >
        { children }
      </Container>
      <Footer />
    </>
  )
}

export default Default