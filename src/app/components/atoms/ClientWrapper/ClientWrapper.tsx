import { Container, Wrapper } from "./ClientWrapper.styles";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default ClientWrapper;
