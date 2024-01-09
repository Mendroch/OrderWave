import { Container, Wrapper } from "./ClientWrapper.styles";

interface ClientWrapperProps {
  children: React.ReactNode;
  withBottomPadding: boolean;
}

const ClientWrapper = ({ children, withBottomPadding = false }: ClientWrapperProps) => {
  return (
    <Wrapper $withPadding={withBottomPadding}>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default ClientWrapper;
